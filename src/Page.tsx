import React from "react";
import { Switch, Route } from "react-router-dom";
import {NavBar, Footer} from './layout'
import {MainTopPage, MainBottomPage} from './pages/splash-page'
import {Map} from './pages/SearchHospital'
import {Ambulance} from './pages/Ambulance'
import {TeleMedicine} from './pages/TeleMedicine'
import {Community, Review, Edit} from './pages/Community'
import {Login, Logout, MyPage} from './pages/Account'


const Page = () => (

    <Switch>
        <Route path="/" exact>
                {/*특정한것만 불러오고싶을때*/}
        <NavBar/>
        <MainTopPage/>
        <MainBottomPage/>
        <Footer/>
        </Route>

        <Route path="/Ambulance">
        <NavBar/>
        <Ambulance/>
        <Footer/>
        </Route>

        <Route path="/Review">
        <NavBar/>
        <Review/>
        <Footer/>
        </Route>

        <Route path="/Edit">
        <NavBar/>
        <Edit/>
        <Footer/>
        </Route>

        <Route path="/TeleMedicine">
        <NavBar/>
        <TeleMedicine/>
        <Footer/>
        </Route>

        <Route path="/Community">
        <NavBar/>
        <Community/>
        <Footer/>
        </Route>

        <Route path="/SearchHospital">
        <NavBar/>
        <Map/>
        <Footer/>
        </Route>

        <Route path="/Login">
        <NavBar/>
        <Login/>
        <Footer/>
        </Route>
        
        <Route path="/Logout">
        <NavBar/>
        <Logout/>
        <Footer/>
        </Route>
        
        <Route path="/MyPage">
        <NavBar/>
        <MyPage/>
        <Footer/>
        </Route>


    </Switch>
);

export default Page;