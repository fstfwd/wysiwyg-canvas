class Viewport_CommandRouter extends Events {

	public viewport: Viewport;

	constructor( viewport: Viewport ) {
		super();
		this.viewport = viewport;
	}

	public commandName( command: EditorCommand ): string {
		switch ( command ) {
			case EditorCommand.INSERT_TEXT: return 'insertText'; break;
			case EditorCommand.DELETE_TEXT:	return 'deleteText'; break;
			case EditorCommand.NEW_LINE: 	return 'newLine'; 	 break;
			case EditorCommand.MOVE: 		return 'moveCaret';  break;
			case EditorCommand.BOLD:		return 'bold';		 break;
			case EditorCommand.ITALIC:		return 'italic';	 break;
			case EditorCommand.UNDERLINE:	return 'underline';  break;
			case EditorCommand.ALIGN:		return 'align';		 break;
			case EditorCommand.COPY:		return 'copy';		 break;
			case EditorCommand.CUT:			return 'cut';		 break;
			case EditorCommand.PASTE:		return 'paste';		 break;
			case EditorCommand.INDENT:		return 'indent'; 	 break;
			case EditorCommand.UNINDENT:	return 'unindent';   break;
			case EditorCommand.VALIGN:		return 'verticalAlign'; break;
			case EditorCommand.FONT:		return 'setFont';	 break;
			case EditorCommand.COLOR:		return 'setColor';   break;
			case EditorCommand.SIZE:		return 'setSize';	 break;
			default:
				throw "ERR_UNKNOWN_COMMAND";
				break;
		}

	}

	private ensureArgs( args: any, minArgs: number, maxArgs: number ): boolean {
		return args && args.length >= minArgs && args.length <= maxArgs;
	}

	public dispatchCommand( command: EditorCommand, args: any[] ) {

		var commandName: string = this.commandName( command );

		console.log( 'dispatchCommand: ' + commandName + '(' + JSON.stringify( args ) + ')' );

		switch ( command ) {
			case EditorCommand.INSERT_TEXT:
				if ( !this.ensureArgs( args, 1, 1 ) ) {
					throw "Command: " + commandName + " require 1 argument of type string[1]";
				} else {
					this.insertText( String( args[0] ) );
				}
				break;
			case EditorCommand.DELETE_TEXT:
				if ( !this.ensureArgs( args, 1, 1 ) ) {
					throw "Command: " + commandName + " require 1 argument of type integer";
				} else {
					this.deleteText( ~~args[0] );
				}
				break;
			case EditorCommand.NEW_LINE:
				if ( !this.ensureArgs( args, 0, 1 ) ) {
					throw "Command: " + commandName + " require a maximum 1 argument of type boolean";
				} else {
					if ( args.length == 1 ) {
						this.newLine( !!args[0] );
					} else {
						this.newLine();
					}
				}
			case EditorCommand.MOVE:
				if ( !this.ensureArgs( args, 3, 3 ) ) {
					throw "Command: " + commandName + " require 3 arguments of type CaretPos, int, boolean."
				} else {
					this.moveCaret( args[0], args[1], args[2] );
				}
				break;
			case EditorCommand.BOLD:
				if ( !this.ensureArgs( args, 0, 1 ) ) {
					throw "Command: " + commandName + " require one optional argument of type boolean.";
				} else {
					this.bold( args.length ? !!args[0] : null );
				}
				break;
			case EditorCommand.ITALIC:
				if ( !this.ensureArgs( args, 0, 1 ) ) {
					throw "Command: " + commandName + " require one optional argument of type boolean.";
				} else {
					this.italic( args.length ? !!args[0] : null );
				}
				break;
			case EditorCommand.UNDERLINE:
				if ( !this.ensureArgs( args, 0, 1 ) ) {
					throw "Command: " + commandName + " require one optional argument of type boolean.";
				} else {
					this.underline( args.length ? !!args[0] : null );
				}
				break;
			case EditorCommand.ALIGN:
				if ( !this.ensureArgs( args, 1, 1 ) ) {
					throw "Command: " + commandName + " require a single string argument.";
				} else {
					this.align( String( args[0] ) );
				}
				break;
			case EditorCommand.COPY:
				if ( !this.ensureArgs( args, 0, 0 ) ) {
					throw "Command: " + commandName + " doesn't require any arguments!";
				} else {
					this.copy();
				}
				break;
			case EditorCommand.CUT:
				if ( !this.ensureArgs( args, 0, 0 ) ) {
					throw "Command: " + commandName + " doesn't require any arguments!";
				} else {
					this.cut();
				}
				break;

			case EditorCommand.PASTE:
				if ( !this.ensureArgs( args, 0, 2 ) ) {
					throw "Command: " + commandName + " require 2 optional args of type string!";
				} else {
					this.paste( args.length == 0 ? null : String( args[0] ), args.length == 2 ? args[1] : null );
				}
				break;

			case EditorCommand.INDENT:
				if ( !this.ensureArgs( args, 0, 1 ) ) {
					throw "Command: " + commandName + " requires a single optional number argument!";
				} else {
					this.indent( args.length ? ~~args[0] : null );
				}
				break;
			case EditorCommand.UNINDENT:
				if ( !this.ensureArgs( args, 0, 1 ) ) {
					throw "Command: " + commandName + " requires a single optional number argument!";
				} else {
					this.unindent( args.length ? ~~args[0] : null );
				}
				break;
			case EditorCommand.VALIGN:
				if ( !this.ensureArgs( args, 1, 1 ) ) {
					throw "Command: " + commandName + " requires a single argument of type string!";
				} else {
					this.valign( String( args[0] || 'normal' ) );
				}
				break;
			case EditorCommand.FONT:
				if ( !this.ensureArgs( args, 1, 1 ) ) {
					throw "Command: " + commandName + " requires a single string argument!";
				} else {
					this.font( String( args[0] || "Arial" ) );
				}
				break;
			case EditorCommand.COLOR:
				if ( !this.ensureArgs( args, 1, 1 ) ) {
					throw "Command: " + commandName + " requires a single argument!";
				} else {
					this.color( String( args[0] || '' ) );
				}
				break;
			case EditorCommand.SIZE:
				if ( !this.ensureArgs( args, 1, 1 ) ) {
					throw "Command: " + commandName + " requires a single argument of type string!";
				} else {
					this.size( String( args[0] || '' ) );
				}
				break;
			default:
				throw "ERR_UNKNOWN_COMMAND";
				break;
		}
	}

	// inserts a string @ caret position.
	public insertText( str: string ) {

	}

	// negative values delete characters in the left of the caret,
	// positive values delete characters in the right of the caret
	public deleteText( amount: number ) {

	}

	// inserts a new line in document. if forceBRTag is set (not null)
	// a <br> tag will be inserted instead of creating a new paragraph.
	public newLine( forceBRTag: boolean = null ) {

	}

	// moves the caret, and optionally extends the selection to the
	// new caret position.
	public moveCaret( movementType: CaretPos, amount: number, expandSelection: boolean ) {

	}

	// sets the boldness of the text. if state is null, then the boldness is toggled.
	public bold( state: boolean = null ) {

	}

	// makes text italic or not. if state is null, the state is toggled.
	public italic( state: boolean = null ) {

	}

	// underlines or not the text. if state is null, the state is toggled.
	public underline( state: boolean = null ) {

	}

	// sets the text alignment.
	// @param alignment: string = enum( 'left', 'right', 'center', 'justified' ).
	// any other values will be considered "left".
	public align( alignment: string = 'left' ) {

	}

	// copies the selection into the clipboard.
	public copy() {

	}

	// cuts the selection into the clipboard.
	public cut() {

	}

	// pastes a text of format contentType.
	// @content: string. if null, the content from the clipboard will be 
	// used instead.
	// @contentType: the type of the content. allowed values can be "text" or "html".
	public paste( content: string = null, contentType: string = null ) {

	}

	// indents text with a number of tabs on the left. A tab width is 20px.
	public indent( tabs: number = null ) {

	}

	// unindents text with a number of tabs on the left. A tab width is 20px.
	public unindent( tabs: number = null ) {

	}

	// sets the text alignment as "sup", "sub", or "normal".
	// "sup" stands for superscript
	// "sub" stands for subscript
	public valign( verticalAlignmentType: string = 'normal' ) {

	}

	// sets the font of the text.
	public font( fontFamily: string = "Arial" ) {

	}

	// sets the color of the selected text. if empty value
	// is used, color is removed.
	public color( colorName: string = "" ) {

	}

	// sets the font size. value can be also relative
	// using + or -. Eg: fontSize( "+1" ) will increase the text size
	// with 1 value.
	public size( fontSize: string = '' ) {

	}

}