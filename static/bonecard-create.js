$(document).ready(function() {

    var editor = ace.edit("editor0");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");

    // make bonecard list sortable
    $('.sortable').sortable();

    //append new bonecard to the list when clicking on 'add bonecard'
    var bonecard_id = 1;
    var selected_id = 0;

    $('button.add-bonecard').on('click', function(e) {
        e.preventDefault();
        $('ul.bonecards-list').append(bonecard_item(bonecard_id));
        $('.sortable').sortable(); // make the add bonecard sortable
        $('div.view-content').append(bonecard_block(bonecard_id));
        // reinit appended textarea to be ckeditor
        $('div.view-content').find('textarea#editor' + bonecard_id).ckeditor().end();

        // apply 'on click' on the new added bonecard
        update_bonecards_list_action();


        editor = ace.edit("editor" + bonecard_id);
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/javascript");

        bonecard_id++;
    });

    function update_bonecards_list_action() {
        $('ul.bonecards-list').find('li').each(function(i) {
            var $this = $(this);
            $this.on('click', function() {
                selected_id = $this.attr('id').substring(19);
                display_selected_card(selected_id);
            });
        });
    }

    function display_selected_card(id) {
        $('div.view-content').children().each(function() {
            $this = $(this);
            current_id = $this.attr('id').substring(14);
            if (current_id == selected_id)
                $this.show();
            else
                $this.hide();
        });
    }

    // html content for adding new bonecard-micro to the list
    function bonecard_item(index) {
        return '<li id="bonecard-micro-item' + index + '" ' +
            'class="bonecards-list-item"><div class="' +
            'bonecard-micro"><div class="bonecard-micro-content' +
            '"><h2>untitled bonecard' + index + '</h2></div></div></li>';
    }

    //html content to add new bonecard block for editing
    function bonecard_block(index) {
        // data-type attr could take 'html'(default) or 'code'
        return '<div id="bonecard-block' + index + '"  style="display: none;" ' +
            'data-type="html">' +
            '<div class="row"><div class="col-md-6"><input' +
            ' type="text" class="form-control bonecard-title-input-text" id="bonecard-title' + index + '" ' +
            'placeholder="bonecard Title" value=""></div><div class="col-md-3 ' +
            'col-md-offset-3"><div class="btn-group float-right" data-toggle=' +
            '"buttons"><label class="btn btn-default active"><input ' +
            'type="radio" name="options' + index + '" id="option' + index + '-1" autocomplete=' +
            '"off" value="html" checked> HTML</label><label class="btn btn-default">' +
            '<input type="radio" name="options' + index + '" id="option' + index + '-2" autocomplete=' +
            '"off" value="code" > Code</label></div></div></div></br></br>' +
            '<div class="code-card"' +
            'style="display: none;"><div class="row"><div' +
            ' class="col-md-12" ><div class="bonecard-code">' +
            '<div id="editor' + index + '" class="code"></div></div></div></div></div>' +
            '<div class="html-card" role="tabpanel"><ul class="nav nav-tabs"' +
            ' role="tablist"><li role="presentation" class=' +
            '"active bonecard-write"><a href="#write' + index + '"' +
            ' aria-controls="write" role="tab" data-toggle' +
            '="tab">Write</a></li><li role="presentation"><a ' +
            'href="#preview' + index + '" class="bonecard-preview" ' +
            'aria-controls="preview" role="tab" data-toggle=' +
            '"tab">Preview</a></li></ul><div class="tab-content">' +
            '<div role="tabpanel" class="tab-pane active" id="write' + index + '">' +
            '<div class="bonecard-editor"><textarea class="ckeditor" ' +
            'cols="80" id="editor' + index + '" name="editor' + index + '" rows="10"></textarea>' +
            '</div></div><div role="tabpanel" class="tab-pane" id=' +
            '"preview' + index + '"></br><div class="bonecard-zoomed">' +
            '<div id="editor' + index + '-content"></div></div></div></div></div></div>';
    }
});