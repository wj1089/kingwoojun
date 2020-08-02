import React, {useState} from 'react';
import {Table, Navbar,Form,FormControl,Button,DropdownButton,Dropdown} from "react-bootstrap";
import {Link} from "react-router-dom";


const Chart=()=> {

    return(

    <Table striped bordered hover>

        <Navbar className="bg-light justify-content-between">
            <thead>
                <tr>
                    <th
                        style={{
                            width:'200px'
                        }}
                    >
                        <DropdownButton   id="dropdown-basic-button" title="항목">
                            <Dropdown.Item href="#/action-1">공지</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">육아</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">자랑</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">나눔</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">후기</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">기타</Dropdown.Item>
                        </DropdownButton>
                    </th>
                    <th
                        style={{
                            width:'700px'
                        }}
                    >
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className=" mr-sm-2" style={{width:"380px"}}/>
                        <Button type="submit">게시물 검색하기</Button>
                    </Form>
                    </th>
                    <th
                        style={{
                            width:'200px'
                        }}
                    >
                        <DropdownButton id="dropdown-basic-button" title="수정/삭제">
                            <Dropdown.Item href="#/action-1">수정</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">삭제</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">감추기</Dropdown.Item>
                        </DropdownButton></th>
                </tr>
                <tbody>

                <tr>
                    <td>**</td>
                    <td><Link to="/Review">김모씨</Link></td>
                    <td>@dog</td>
                </tr>
                <tr>
                    <td>**</td>
                    <td><Link to="/Review">이모씨</Link></td>
                    <td>@cat</td>
                </tr>
                <tr>
                    <td>**</td>
                    <td>박모씨</td>
                    <td>@pig</td>
                </tr>
                <tr>
                    <td>**</td>
                    <td>최모씨</td>
                    <td>@mouse</td>
                </tr>
                <tr>
                    <td>**</td>
                    <td>구모씨</td>
                    <td>@fish</td>
                </tr>
                <tr>
                    <td>**</td>
                    <td>강모씨</td>
                    <td>@bird</td>
                </tr>
                <tr>
                    <td>**</td>
                    <td>조모씨</td>
                    <td>@horse</td>
                </tr>
                <tr>
                    <td>**</td>
                    <td>윤모씨</td>
                    <td>@shark</td>
                </tr>
                </tbody>
                <Button className="ml-auto" variant="secondary"
                ><Link to='/Edit'>글쓰기</Link></Button>

            </thead>

        </Navbar>

    </Table>
    )
}
export default Chart