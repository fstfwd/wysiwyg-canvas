class Fragment {
	
	private _at: FragmentItem[] = [];
	private _length: number = 0;
	private _doc: HTML_Body = null;

	constructor ( document: HTML_Body ) {
		if ( !document ) {
			throw "ERR_BAD_DOCUMENT";
		} else {
			this._doc = document;
		}
	}

	public reset() {
		this._length = 0;
	}

	public add( what: FragmentItem, index: number = null ) {
		if ( index == null ) {
			this._at[ this._length++ ] = what;
		} else {
			if ( index < this._length ) {
				this._at[ index ] = what;
			} else {
				this._length = index + 1;
				this._at[ index ] = what;
			}
		}
	}

	public at( index: number, value: FragmentItem = null ): FragmentItem {
		if ( index < 0 || index >= this._length ) {
			throw "OFFSET_OUT_BOUNDS";
		} else {
			if ( value === null ) {
				return this._at[ index ] == void 0 ? null : this._at[ index ];
			} else {
				this.add( value, index );
			}
		}
	}

	public length( value: number=null ): number {
		if ( value == null ) {
			return this._length;
		} else {
			if ( value < 0 ) {
				throw "OFFSET_OUT_BOUNDS";
			} else {
				this._length = value;
			}
		}
	}

	public getNodeAtIndex( index: number ): TNode {
		return this._doc.findNodeAtIndex( index );
	}

	public createTargetAt( pos: FragmentPos ): TRange_Target {
		
		var i: number = 0,
		    element: TNode;

		switch ( pos ) {

			case FragmentPos.DOC_BEGIN:
			
				for ( i=0; i < this._length; i++ ) {
					if ( this._at[i] == FragmentItem.EOL || this._at[i] == FragmentItem.CHARACTER || this._at[i] == FragmentItem.WHITE_SPACE ) {
						element = this.getNodeAtIndex( i );
						return new TRange_Target( element, i );
					}
				}
				break;

			case FragmentPos.DOC_END:

				for ( i = this._length - 1; i >=0 ; i-- ) {
					if ( this._at[i] == FragmentItem.EOL || this._at[i] == FragmentItem.CHARACTER || this._at[i] == FragmentItem.WHITE_SPACE ) {
						element = this.getNodeAtIndex( i );
						return new TRange_Target( element, i );
					}
				}
				break;

			default:
				throw "ERR_ILLEGAL_POS_DESCRIPTOR";
				break;
		}

		return null;
	}

	public getIndexAt( pos: FragmentPos ): number {
		
		var i: number = 0;

		switch ( pos ) {

			case FragmentPos.DOC_BEGIN:
			
				for ( i=0; i < this._length; i++ ) {
					if ( this._at[i] == FragmentItem.EOL || this._at[i] == FragmentItem.CHARACTER || this._at[i] == FragmentItem.WHITE_SPACE ) {
						return i;
					}
				}
				break;

			case FragmentPos.DOC_END:

				for ( i = this._length - 1; i >=0 ; i-- ) {
					if ( this._at[i] == FragmentItem.EOL || this._at[i] == FragmentItem.CHARACTER || this._at[i] == FragmentItem.WHITE_SPACE ) {
						return i;
					}
				}
				break;

			default:
				throw "ERR_ILLEGAL_POS_DESCRIPTOR";
				break;
		}

		return null;
	}

}