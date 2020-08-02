import React,{useState,useEffect,useRef} from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-directions/dist/mapbox-gl-directions.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import ReactMapGL,{Marker,Popup,NavigationControl,FlyToInterpolator} from 'react-map-gl'
import Directions from 'react-map-gl-directions'
import Geocoder from 'react-map-gl-geocoder'
import '../../styles/Map.css'
import * as _ from 'underscore';
import {Button, Col, Container, Form, Image, Modal, Row} from "react-bootstrap";




const MapBox = () => {
    const MAP_TOKEN = 'pk.eyJ1IjoianVuaHdhIiwiYSI6ImNrY3Q4NG5xNDE3bDIyeXBnZzg0NzZ0YzYifQ.c4ILQswrvoXNzakCMy82Hg';
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const[viewport,setViewport] = useState({
        latitude:37.562457,
        longitude: 126.941089,
        width:'1000',
        height:'550px',
        zoom:13
    });

    const mapRef = useRef(null);

    const storeList = [
        {
            name: '신촌 세브란스병원',
            location: {lat:37.562167, lng:126.941056},
            address: '서울 강서구 공항대로63길 14',
            image : 'http://blogfiles.naver.net/20140627_280/k3j0y_1403839325403kA42u_PNG/pic_courtauction_7.jpg'
        },
        {
            name: '가톨릭대학교 서울성모병원',
            location: {lat:	37.501736, lng:127.004716},
            address: '서울 강서구 공항대로 529',
            image : 'data:image/jpeg;base64,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'
        },
        {
            name: '서울대병원',
            location: {lat:37.579602, lng:126.998998},
            address: '서울 강서구 공항대로 561 강서보건소' ,
            image : 'https://mblogthumb-phinf.pstatic.net/MjAxODA0MjNfMTc5/MDAxNTI0NDgwNDkwOTkw.-AIefKUje7S0oKcSSkaLLawiXllaIsASRQ42I38-FGEg.zvaTwvVvSOlE3_OMWDR6TbeHVolSq1ZU6aPH0rgFfXQg.JPEG.tjduswn3577/20180417_103431.jpg?type=w800'
        },
        {
            name: '고려대병원',
            location: {lat:37.550999, lng:126.8589698},
            address: '서울 강서구 공항대로 549' ,
            image : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fldb.phinf.naver.net%2F20200109_34%2F1578536934584lARkQ_PNG%2FG4sy524RQNZsd00KCNdMc-Oy.png&type=f&size=780x288'
        },
        {
            name: '스타벅스 등촌역점',
            location: {lat:37.548885, lng:126.868082},
            address: '서울 양천구 공항대로 566' ,
            image : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fldb.phinf.naver.net%2F20190828_93%2F1566953601239OT9MQ_PNG%2FxX7Wv642gXMoTI0DAv0hRymS.png&type=f&size=780x288'
        },
        {
            name: '비트캠프 신촌점',
            location: {lat:37.5525892, lng:126.9367663},
            address: '서울 마포구 백범로 23 구프라자 3층' ,
            image : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fldb.phinf.naver.net%2F20180327_45%2F1522132708687HXxYX_JPEG%2FIA-KnDb1r3Z1VCsRbhuhycRR.jpg'
        }
    ];

    const [selectedStore, setSelectedStore] = useState();

    useEffect(() => {
        const mapResizeEvent = _.throttle(() => {
            setViewport(Object.assign({}, {
                ...viewport,
                width: `${window.innerWidth}px`,
                height: `${window.innerHeight}px`
            }));
        }, 2000);
        window.addEventListener('resize', mapResizeEvent);
        return () => {
            window.removeEventListener('resize', mapResizeEvent);
        }
    }, [ viewport ]);


    return (
        <div>
                <div className="wrapper">
                    <div className="map_container">
                        <div className="Mapbox">
                            <ReactMapGL
                                ref={mapRef}
                                {...viewport}
                                transitionDuration={800}
                                transitionInterpolator = {new FlyToInterpolator()}
                                mapboxApiAccessToken={MAP_TOKEN}
                                mapStyle={"mapbox://styles/mapbox/streets-v11"}
                                onViewportChange={(viewport)=>{
                                    setViewport(viewport);
                                }}
                            >
                                <div className={"navi-control"}>
                                    <NavigationControl/>
                                </div>
                                <Directions
                                    mapRef={mapRef}
                                    unit={'metric'}
                                    profile={'mapbox/driving'}
                                    mapboxApiAccessToken={MAP_TOKEN}
                                    position={'top-left'} />
                                <Geocoder
                                    mapRef={mapRef}
                                    onViewportChange={(viewport)=>{
                                        setViewport(viewport);
                                    }}
                                    mapboxApiAccessToken={MAP_TOKEN}
                                    placeholder={ '      장소를 검색해주세요.'}
                                    position={'top-left'}
                                />

                                {
                                    storeList.map((store, i) => (
                                        <Marker
                                            key={i}
                                            latitude={store.location.lat}
                                            longitude={store.location.lng}
                                        >
                                            <div>
                                                <Button variant="primary" onClick={handleShow}>
                                                    선택
                                                </Button>

                                                <Modal
                                                    show={show}
                                                    onHide={handleClose}
                                                    backdrop="static"
                                                    keyboard={false}
                                                    className="modal_back"
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Modal title</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <div>
                                                            <tr>
                                                                <td>
                                                                    <Container>
                                                                        <div className="modal-img">
                                                                            <img
                                                                                className="img-thumbnail"
                                                                                src="data:image/jpeg;base64,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"
                                                                                // Link="https://sev.iseverance.com/"
                                                                            />
                                                                        </div>
                                                                    </Container>
                                                                </td>
                                                                <td>
                                                                    <textPath>**신촌 세브란스병원**</textPath>
                                                                    <Form.Group controlId="exampleForm.ControlSelect2">
                                                                        <div>
                                                                            <Form.Control as="select" multiple
                                                                                          style={{width:'280px'}}
                                                                            >
                                                                                <option>예상시간 : ...</option>
                                                                                <option>도착장소 : ...</option>
                                                                                <option>동승자 : ***</option>

                                                                            </Form.Control>
                                                                        </div>
                                                                    </Form.Group>
                                                                    <Form.Group controlId="exampleForm.ControlSelect2">
                                                                        <div>
                                                                            <Form.Control as="select" multiple
                                                                                          style={{width:'280px'}}
                                                                            >
                                                                                <option>**</option>
                                                                                <option>**</option>
                                                                                <option>**</option>
                                                                                <option>**</option>
                                                                                <option>**</option>
                                                                                <option>**</option>
                                                                                <option>**</option>
                                                                                <option>**</option>
                                                                            </Form.Control>
                                                                        </div>
                                                                    </Form.Group>
                                                                </td></tr>
                                                        </div>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>
                                                            <Container>
                                                                <Row>
                                                                    <Col xs={6} md={4} id="img1">
                                                                        <Image style={{height:'180px',width:"180px"}}
                                                                               src="https://lh3.googleusercontent.com/proxy/Y20klh840s8kPUxkji-KY0qsQb4UJOF5A0n7glPTj12ymNyf7IeOxkQcEFGYHoOOnpkMCaW-daX_hN58cyWBHWsC5ZS6nQw" rounded/>
                                                                    </Col>
                                                                    <Col xs={6} md={4} id="img2">
                                                                        <Image style={{ width:"300px"}}
                                                                               src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22171%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20171%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1738e72d318%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1738e72d318%22%3E%3Crect%20width%3D%22171%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2260.8828125%22%20y%3D%2295.1%22%3E171x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" rounded />
                                                                    </Col>
                                                                    <Col xs={6} md={4} id="img3">
                                                                        <Image style={{ width:"300px"}}
                                                                               src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22171%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20171%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1738e72d318%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1738e72d318%22%3E%3Crect%20width%3D%22171%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2260.8828125%22%20y%3D%2295.1%22%3E171x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" rounded />
                                                                    </Col>
                                                                </Row>
                                                            </Container>
                                                        </Button>
                                                        <Button variant="danger">초기화</Button>
                                                        <Button variant="primary">선택하기</Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </div>
                                            <button className={"btn-marker"} onClick={()=>setSelectedStore(store)}/>
                                        </Marker>
                                    ))
                                }
                                {
                                    selectedStore && (
                                        <Popup
                                            offsetLeft={10}
                                            latitude={selectedStore.location.lat}
                                            longitude={selectedStore.location.lng}
                                            onClose={()=>setSelectedStore(null)}
                                        >
                                            <div>{selectedStore.name}</div>
                                        </Popup>
                                    )
                                }
                            </ReactMapGL>
                        </div>

                    </div>
                </div>
        </div>
    );
};

export default MapBox;