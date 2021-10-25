import React from 'react';
import { Route, Switch } from 'react-router';
import { useState } from 'react/cjs/react.development';
import Header from '../components/Header';
import Profile from '../components/Profile';
import Thread from '../components/Thread/Thread';

const Home = props => {
    return (
        <div className="homepage">
            <Header
                handleLogout={props.handleLogout}
            />
            <Switch>
                <Route exact path="/">
                    <Thread
                        contentType="post"
                        messageList={props.postList}
                    />
                </Route>
                <Route exact path="/profile">
                    <Profile handleLogout={props.handleLogout} />
                </Route>
            </Switch>
        </div>
    );
};

export default Home;