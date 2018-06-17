import React from 'react';

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.fileChanged = this.fileChanged.bind(this);
    }

    fileChanged(e){
      const file = e.target.files[0];
      this.props.onFileChange(file);
    }

    render(){
        return (
           <label>
             <input accept="image/*" type="file" onChange={this.fileChanged}/>
           </label>
        );
    }
}

export default FileUpload;
