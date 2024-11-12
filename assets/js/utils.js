// This is built for Toggle buttons icon
// Used to rotate the triangle icon inside the button.

function rotateTriangle(e){
    let id = e.value
    const icon = document.getElementById(id);
    if (icon.style.transform === 'rotate(90deg)') {
      icon.style.transform = 'rotate(0deg)'
    } else {
      icon.style.transform = 'rotate(90deg)'
    }
  }
 
  // expand all uikit accordion on page
  function expandAllAccordion() {
    const nodeList = document.querySelectorAll(".ukaccordion");
    const contentDiv = document.querySelectorAll(".uk-accordion-content")
      for (let i = 0; i < nodeList.length; i++){
        contentDiv[i].removeAttribute('hidden')
        nodeList[i].setAttribute("class","uk-open")
      }
  }
  
      // collapse all uikit accordion on page
  function collapseAllAccordion(){
    const nodeList = document.querySelectorAll(".uk-open");
    const contentDiv = document.querySelectorAll(".uk-accordion-content")
    for (let i = 0; i < nodeList.length; i++){
        nodeList[i].setAttribute("class", "ukaccordion")
        for(let j = 0; j < contentDiv.length; j++){
          contentDiv[j].setAttribute('hidden', true)
        }
      }
    }