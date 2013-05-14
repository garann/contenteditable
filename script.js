var txt = $( "#faketextarea" );
txt[0].contentEditable = true;
txt.focus();
txt.on( "blur", function() {
    $( "#textareasrc" ).val( txt.html().toString() );
});

$( "section" ).on( "click", "button", function( e ) {
    e.preventDefault();
    if ( $( this ).hasClass( "cust" ) )
        return;
    
    if ( $( this ).hasClass( "valu" ) ) {
        var valu = window.prompt( "value:" );
        document.execCommand( this.innerHTML, false, valu );
    } else {
        document.execCommand( this.innerHTML );
    }
    return false;
});

$( "section" ).on( "click", "button.cust", function( e ) {
    var sel = window.getSelection(),
        start = sel.anchorOffset,
        end = sel.focusOffset,
        base = sel.anchorNode,
        baseHTML,
        extent = sel.focusNode,
        extHTML,
        starttag = '<div class="custom">',
        endtag = '</div>',
        newHTML = "",
        baseParent = base.parentNode;
    
    if ( start == 0 && base.nodeValue.length == base.parentNode.innerHTML.length ) {
        base = baseParent;
        baseParent = baseParent.parentNode;
    }
    if ( end == extent.nodeValue.length && extent.nodeValue.length == extent.parentNode.innerHTML.length ) {
        extent = extent.parentNode;
    }
    
    // nodes must be at same depth
    if ( baseParent != extent.parentNode ) {
        return false;
    }
    
    $( baseParent ).contents().each( function( el ) {
        if ( this == base && this == extent ) {
            if ( this.nodeType == 1) {
                newHTML += starttag + this.outerHTML + endtag;
            } else if ( this.nodeType == 3 ) {
                baseHTML = this.nodeValue;
                newHTML += baseHTML.substring( 0, start ) + starttag + baseHTML.substring( start, end ) + endtag + baseHTML.substring( end );
            }
        } else if ( this == base ) {
            if ( this.nodeType == 1 ) {
                newHTML += starttag + this.outerHTML;
            } else if ( this.nodeType == 3 ) {
                baseHTML = this.nodeValue;
                newHTML += baseHTML.substring( 0, start ) + starttag + baseHTML.substring( start );
            }                
        } else if ( this == extent ) {
            if ( this.nodeType == 1 ) {
                newHTML += this.outerHTML + endtag;
            } else if ( this.nodeType == 3 ) {
                extHTML = this.nodeValue;
                newHTML += extHTML.substring( 0, end ) + endtag + extHTML.substring( end );
            }
        } else {
            newHTML += this.nodeType == 1 ? this.outerHTML : this.nodeValue;
        }
    });
    baseParent.innerHTML = newHTML;
    
    return false;
});
