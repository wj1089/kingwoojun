import React from 'react'
import {Container,Form} from "react-bootstrap";

const Review = () => {


    return (
        <Container>
            <div>
                <textPath>~~님 게시판 리뷰</textPath>
                    <div className="input-group">
                        <div className="input-group-prepend" >
                            <span className="input-group-text" id="basic-addon" >
                            <i className="fas fa-pencil-alt prefix"></i>
                            </span>
                        </div>
                        <div className="text-center">
                        <textarea className="form-control" id="exampleFormControlTextarea1" style={{width:'900px',height:'350px'}}>게시글을 입력해주세요.</textarea>
                        </div>
                        <textPath>댓글 창</textPath>


                    </div>
            </div>
        </Container>
    )
}

export default Review;