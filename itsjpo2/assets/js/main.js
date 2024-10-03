$(document).ready(function(){
    if($('.datatable').length){
        $('.collapseControl').on('click',function(){
            $(this).toggleClass('open');
            $(this).next().toggleClass('open');
        });
    }
})