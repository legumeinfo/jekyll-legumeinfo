document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('request-germplasm-header').disabled = true;
    document.getElementById('request-germplasm-footer').disabled = true;
    var domain = "dev.lis.ncgr.org:50027";
    var table = $('#germplasm-datatable').DataTable({
        'ajax' : {
                  'url': 'http://' + domain + '/germplasm-list'
                 },
        'columns' : [
            {'data': null, defaultContent: ""},
            {'data': 0},
            {'data': 1},
            {'data': 2},
            {'data': 3},
            {'data': 4},
            {'data': 5}
        ],
        "bSortClasses" : false,
        'lengthMenu': [[-1, 10, 50, 100], ['All', 10, 50, 100]],
        "colReorder" : {
            fixedColumnsLeft: [1, 2]
        },
        "columnDefs": [{className: "select-checkbox", targets: 0}],
        "search": {
            "caseInsensitive": true,
            "regex": true
        },
        "select" : true,
        "order" : []
    });
    $('#germplasm-datatable tbody').on('click', 'tr', function(){
        var selected = table.rows('.selected').data();
        var my_selection = selected.map(x => x[0].trim()).join(',');
        if (selected.length > 0){
          document.getElementById('request-germplasm-header').disabled = false;
          document.getElementById('request-germplasm-footer').disabled = false;
        } else {
          document.getElementById('request-germplasm-header').disabled = true;
          document.getElementById('request-germplasm-footer').disabled = true;
        }
        var request_me = document.getElementById('return-email-selection');
        console.log(selected, my_selection);
        request_me.value = my_selection;
    });
    /*document.getElementById('request-germplasm').addEventListener('click',
        function(){
            console.log('clicked me ' + table);
            var export_me = table.rows('.selected').data();
            var hapmap_ids = {'data': []};
            if (export_me.length > 0){
                console.log(export_me);
                for(var i=0;i < export_me.length;i++){
                    hapmap_ids['data'].push(export_me[i]['hapmap_id'].replace(/\s+/g, ''));
                }
                console.log(hapmap_ids);
                xhr_post('http://fisher.ncgr.org:50021/germplasm-request', hapmap_ids);
            }
            return
    });*/
    /*document.getElementById('request-germplasm').addEventListener('submit')*/
});
    
function xhr_post(url, data){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true)
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response_page = xhr.responseText;
            console.log(response_page);
            var new_page = window.open('', '_blank');
            console.log(new_page);
            new_page.document.write('<h1>' + response_page + '</h1>');
            new_page.stop()
            return
        }
    };
    xhr.send(JSON.stringify(data));
}
function alert_placeholder(){
    alert('Coming Soon!')
}
