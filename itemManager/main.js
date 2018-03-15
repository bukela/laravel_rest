$(document).ready(function(){
    getItems();

    //submit event
    $('#itemForm').on('submit', function(e){
        e.preventDefault();

        let text = $('#text').val();
        let body = $('#body').val();

        addItem(text,body);
    });

    //delete event
    $('body').on('click', '.deleteLink', function(e) {
        e.preventDefault();
        let id = $(this).data('id');
        let ttext = $(this).data('text');
        deleteItem(id);
    })

    // delete item
    function deleteItem(id) {
        $.ajax({
            method: 'POST',
            url: 'http://dev.api.laravelrest.loc/api/items/'+id,
            data: {_method : 'DELETE'}
        }).done(function(item){
            alert('Item #'+id+' Deleted');
            location.reload();
        });
    }

    // insert items using api
    function addItem(text,body) {
        $.ajax({
            method: 'POST',
            url: 'http://dev.api.laravelrest.loc/api/items',
            data: {text:text, body:body}
        }).done(function(item){
            alert('Item #'+item.id+' Added');
            location.reload();
        });
    }
    function getItems() {
        $.ajax({
            url:'http://dev.api.laravelrest.loc/api/items'
        }).done(function(items) {
            let output = '';
            $.each(items, function(key,item) {
                output += `
                <li class="list-group-item">
                    <strong>${item.text} : </strong>${item.body} <a href="#" class="deleteLink" data-id="${item.id}">Delete Item</a>
                </li>
                `;
            });
            $('#items').append(output);
        });
    }
});