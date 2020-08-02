import React, {useState} from "react";
import {Container,Form, Button,Row,Col} from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import './styles.css'

const Edit = () => {
    const [value, setValue] = useState('')
    const modules = {
        toolbar: [
            //[{header: [1, 2, false]}],
            ['bold', 'italic', 'underline', 'strike', 'link', 'image']
            //[{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
            //['clean']
        ]
    }

    const formats = [
        //'header',
        'bold',
        'italic',
        'underline',
        'strike',
        /*
        'blockquote',
        'list',
        'bullet',
        'indent',
        */
        'link',
        'image'
    ]
    return (
        <Container>
            <div>
                <textPath>게시글쓰기</textPath>
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    modules={modules}
                    formats={formats}
                />
                    <div className="input-group">
                        {/*<div className="text-center">*/}
                        {/*    <textarea className="form-control" id="exampleFormControlTextarea1" style={{width:'100%'}}></textarea>*/}
                        {/*</div>*/}
                        <Form>
                            <Form.Group>
                                <Form.File id="exampleFormControlFile1" label="사진 및 동영상 올리기" />
                                <Button as="input" type="submit" value="Submit" />{' '}
                                <Button className="Cancel">Cancel</Button>
                            </Form.Group>
                        </Form>

                    </div>
            </div>
        </Container>
    );
};

export default Edit;

