import {
    $,
    Animation,
    addClass,
    after,
    before,
    clamp,
    css,
    height as getHeight,
    offset as getOffset,
    hasClass,
    index,
    intersectRect,
    isNumeric,
    isString,
    isVisible,
    noop,
    offsetPosition,
    once,
    parent,
    query,
    remove,
    removeClass,
    replaceClass,
    toFloat,
    toPx,
    toggleClass,
    trigger,
} from 'uikit-util';
import { resize, scroll, viewport } from '../api/observables';
import Class from '../mixin/class';
import Media from '../mixin/media';

export default {
    mixins: [Class, Media],

    props: {
        position: String,
        top: null,
        bottom: null,
        start: null,
        end: null,
        offset: String,
        overflowFlip: Boolean,
        animation: String,
        clsActive: String,
        clsInactive: String,
        clsFixed: String,
        clsBelow: String,
        selTarget: String,
        showOnUp: Boolean,
        targetOffset: Number,
    },

    data: {
        position: 'top',
        top: false,
        bottom: false,
        start: false,
        end: false,
        offset: 0,
        overflowFlip: false,
        animation: '',
        clsActive: 'uk-active',
        clsInactive: '',
        clsFixed: 'uk-sticky-fixed',
        clsBelow: 'uk-sticky-below',
        selTarget: '',
        showOnUp: false,
        targetOffset: false,
    },

    computed: {
        target: ({ selTarget }, $el) => (selTarget && $(selTarget, $el)) || $el,
    },

    connected() {
        this.start = coerce(this.start || this.top);
        this.end = coerce(this.end || this.bottom);

        this.placeholder =
            $('+ .uk-sticky-placeholder', this.$el) ||
            $('<div class="uk-sticky-placeholder"></div>');
        this.isFixed = false;
        this.setActive(false);
    },

    beforeDisconnect() {
        if (this.isFixed) {
            this.hide();
            removeClass(this.target, this.clsInactive);
        }
        reset(this.$el);

        remove(this.placeholder);
        this.placeholder = null;
    },

    observe: [
        viewport({
            handler() {
                if (toPx('100vh', 'height') !== this._data.viewport) {
                    this.$emit('resize');
                }
            },
        }),
        scroll({ target: () => document.scrollingElement }),
        resize({
            target: () => document.scrollingElement,
            options: { box: 'content-box' },
        }),
        resize({ target: ({ $el }) => $el }),
    ],

    events: [
        {
            name: 'load hashchange popstate',

            el() {
                return window;
            },

            filter() {
                return this.targetOffset !== false;
            },

            handler() {
                const { scrollingElement } = document;

                if (!location.hash || scrollingElement.scrollTop === 0) {
                    return;
                }

                setTimeout(() => {
                    const targetOffset = getOffset($(location.hash));
                    const elOffset = getOffset(this.$el);

                    if (this.isFixed && intersectRect(targetOffset, elOffset)) {
                        scrollingElement.scrollTop =
                            targetOffset.top -
                            elOffset.height -
                            toPx(this.targetOffset, 'height', this.placeholder) -
                            toPx(this.offset, 'height', this.placeholder);
                    }
                });
            },
        },
        {
            name: 'transitionstart',

            handler() {
                this.transitionInProgress = once(
                    this.$el,
                    'transitionend transitioncancel',
                    () => (this.transitionInProgress = null),
                );
            },
        },
    ],

    update: [
        {
            read({ height, width, margin, sticky }) {
                this.inactive = !this.matchMedia || !isVisible(this.$el);

                if (this.inactive) {
                    return;
                }

                const hide = this.isFixed && !this.transitionInProgress;
                if (hide) {
                    preventTransition(this.target);
                    this.hide();
                }

                if (!this.active) {
                    ({ height, width } = getOffset(this.$el));
                    margin = css(this.$el, 'margin');
                }

                if (hide) {
                    this.show();
                }

                const viewport = toPx('100vh', 'height');
                const dynamicViewport = getHeight(window);
                const maxScrollHeight = Math.max(
                    0,
                    document.scrollingElement.scrollHeight - viewport,
                );

                let position = this.position;
                if (this.overflowFlip && height > viewport) {
                    position = position === 'top' ? 'bottom' : 'top';
                }

                const referenceElement = this.isFixed ? this.placeholder : this.$el;
                let offset = toPx(this.offset, 'height', sticky ? this.$el : referenceElement);
                if (position === 'bottom' && (height < dynamicViewport || this.overflowFlip)) {
                    offset += dynamicViewport - height;
                }

                const overflow = this.overflowFlip ? 0 : Math.max(0, height + offset - viewport);
                const topOffset = getOffset(referenceElement).top;
                const elHeight = getOffset(this.$el).height;

                const start =
                    (this.start === false
                        ? topOffset
                        : parseProp(this.start, this.$el, topOffset)) - offset;
                const end =
                    this.end === false
                        ? maxScrollHeight
                        : Math.min(
                              maxScrollHeight,
                              parseProp(this.end, this.$el, topOffset + height, true) -
                                  elHeight -
                                  offset +
                                  overflow,
                          );

                sticky =
                    maxScrollHeight &&
                    !this.showOnUp &&
                    start + offset === topOffset &&
                    end ===
                        Math.min(
                            maxScrollHeight,
                            parseProp(true, this.$el, 0, true) - elHeight - offset + overflow,
                        ) &&
                    css(parent(this.$el), 'overflowY') === 'visible';

                return {
                    start,
                    end,
                    offset,
                    overflow,
                    height,
                    elHeight,
                    width,
                    margin,
                    top: offsetPosition(referenceElement)[0],
                    sticky,
                    viewport,
                };
            },

            write({ height, width, margin, offset, sticky }) {
                if (this.inactive || sticky || !this.isFixed) {
                    reset(this.$el);
                }

                if (this.inactive) {
                    return;
                }

                if (sticky) {
                    height = width = margin = 0;
                    css(this.$el, { position: 'sticky', top: offset });
                }

                const { placeholder } = this;

                css(placeholder, { height, width, margin });

                if (
                    parent(placeholder) !== parent(this.$el) ||
                    sticky ^ (index(placeholder) < index(this.$el))
                ) {
                    (sticky ? before : after)(this.$el, placeholder);
                    placeholder.hidden = true;
                }
            },

            events: ['resize'],
        },

        {
            read({
                scroll: prevScroll = 0,
                dir: prevDir = 'down',
                overflow,
                overflowScroll = 0,
                start,
                end,
                elHeight,
                height,
                sticky,
            }) {
                const scroll = document.scrollingElement.scrollTop;
                const dir = prevScroll <= scroll ? 'down' : 'up';
                const referenceElement = this.isFixed ? this.placeholder : this.$el;

                return {
                    dir,
                    prevDir,
                    scroll,
                    prevScroll,
                    below:
                        scroll >
                        getOffset(referenceElement).top +
                            (sticky ? Math.min(height, elHeight) : height),
                    offsetParentTop: getOffset(referenceElement.offsetParent).top,
                    overflowScroll: clamp(
                        overflowScroll + clamp(scroll, start, end) - clamp(prevScroll, start, end),
                        0,
                        overflow,
                    ),
                };
            },

            write(data, types) {
                const isScrollUpdate = types.has('scroll');
                const {
                    initTimestamp = 0,
                    dir,
                    prevDir,
                    scroll,
                    prevScroll = 0,
                    top,
                    start,
                    below,
                } = data;

                if (
                    scroll < 0 ||
                    (scroll === prevScroll && isScrollUpdate) ||
                    (this.showOnUp && !isScrollUpdate && !this.isFixed)
                ) {
                    return;
                }

                const now = Date.now();
                if (now - initTimestamp > 300 || dir !== prevDir) {
                    data.initScroll = scroll;
                    data.initTimestamp = now;
                }

                if (
                    this.showOnUp &&
                    !this.isFixed &&
                    Math.abs(data.initScroll - scroll) <= 30 &&
                    Math.abs(prevScroll - scroll) <= 10
                ) {
                    return;
                }

                if (
                    this.inactive ||
                    scroll < start ||
                    (this.showOnUp &&
                        (scroll <= start ||
                            (dir === 'down' && isScrollUpdate) ||
                            (dir === 'up' && !this.isFixed && !below)))
                ) {
                    if (!this.isFixed) {
                        if (Animation.inProgress(this.$el) && top > scroll) {
                            Animation.cancel(this.$el);
                            this.hide();
                        }

                        return;
                    }

                    if (this.animation && below) {
                        if (hasClass(this.$el, 'uk-animation-leave')) {
                            return;
                        }
                        Animation.out(this.$el, this.animation).then(() => this.hide(), noop);
                    } else {
                        this.hide();
                    }
                } else if (this.isFixed) {
                    this.update();
                } else if (this.animation && below) {
                    this.show();
                    Animation.in(this.$el, this.animation).catch(noop);
                } else {
                    preventTransition(this.target);
                    this.show();
                }
            },

            events: ['resize', 'resizeViewport', 'scroll'],
        },
    ],

    methods: {
        show() {
            this.isFixed = true;
            this.update();
            this.placeholder.hidden = false;
        },

        hide() {
            const { offset, sticky } = this._data;
            this.setActive(false);
            removeClass(this.$el, this.clsFixed, this.clsBelow);
            if (sticky) {
                css(this.$el, 'top', offset);
            } else {
                css(this.$el, {
                    position: '',
                    top: '',
                    width: '',
                    marginTop: '',
                });
            }
            this.placeholder.hidden = true;
            this.isFixed = false;
        },

        update() {
            let {
                width,
                scroll = 0,
                overflow,
                overflowScroll = 0,
                start,
                end,
                offset,
                offsetParentTop,
                sticky,
                below,
            } = this._data;
            const active = start !== 0 || scroll > start;

            if (!sticky) {
                let position = 'fixed';

                if (scroll > end) {
                    offset += end - offsetParentTop + overflowScroll - overflow;
                    position = 'absolute';
                }

                css(this.$el, { position, width, marginTop: 0 }, 'important');
            }

            css(this.$el, 'top', offset - overflowScroll);

            this.setActive(active);
            toggleClass(this.$el, this.clsBelow, below);
            addClass(this.$el, this.clsFixed);
        },

        setActive(active) {
            const prev = this.active;
            this.active = active;
            if (active) {
                replaceClass(this.target, this.clsInactive, this.clsActive);
                prev !== active && trigger(this.$el, 'active');
            } else {
                replaceClass(this.target, this.clsActive, this.clsInactive);
                if (prev !== active) {
                    preventTransition(this.target);
                    trigger(this.$el, 'inactive');
                }
            }
        },
    },
};

function parseProp(value, el, propOffset, padding) {
    if (!value) {
        return 0;
    }

    if (isNumeric(value) || (isString(value) && value.match(/^-?\d/))) {
        return propOffset + toPx(value, 'height', el, true);
    } else {
        const refElement = value === true ? parent(el) : query(value, el);
        return (
            getOffset(refElement).bottom -
            (padding && refElement?.contains(el) ? toFloat(css(refElement, 'paddingBottom')) : 0)
        );
    }
}

function coerce(value) {
    if (value === 'true') {
        return true;
    } else if (value === 'false') {
        return false;
    }
    return value;
}

function reset(el) {
    css(el, { position: '', top: '', marginTop: '', width: '' });
}

function preventTransition(el) {
    addClass(el, 'uk-transition-disable');
    requestAnimationFrame(() => removeClass(el, 'uk-transition-disable'));
}
