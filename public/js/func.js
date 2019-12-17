
var btn = document.getElementById('btn-modify');
var modifydiv = document.getElementById('modify-div');

function modify(){
if (modifydiv.classList.contains('modify')){
    modifydiv.classList.remove("modify")
}
else {
    modifydiv.classList.add("modify")
}
}

$('#btn-modify').click(function (e) { 
    modify()
    
});
var filters = document.getElementById("filters")

$('#btn-filter').click(function () { 
    
 
    if (filters.style.maxHeight){
    filters.style.maxHeight = null
    filters.style.border = null
    }
    else 
    {
    filters.style.maxHeight = "288px"
    filters.style.border = "1px solid"
    }
   
});

