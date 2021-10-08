import { Redirect, Route, Switch } from "react-router"
import EditUser from "../pages/EditUser/EditUser"
import HomePage from "../pages/Home/Homepage"
import Login from "../pages/Login/Login"
import NotFound from "../pages/NotFound/NotFound"
import Profile from "../pages/Profile/Profile"
import Signup from "../pages/Signup/Signup"
import Users from "../pages/User/Users"

const Routes = ({ storeUser, loggedUser }) => {
    return (
        <Switch>
            <Route exact path="/" render={() => <HomePage loggedUser={loggedUser} />} />
            <Route exact path="/registro" render={(props) => <Signup {...props} />} />
            <Route exact path="/iniciar-sesion" render={(props) => <Login storeUser={storeUser} {...props} />} />
            <Route exact path="/editar" render={(props) => <EditUser storeUser={storeUser} {...props} />} />
            <Route exact path="/calendar/:id" render={(props) => <Profile {...props} loggedUser={loggedUser} />} />
            {
                loggedUser !== undefined && (loggedUser ? (
                    <>
                        <Route exact path="/usuarios" render={(props) => loggedUser && <Users {...props} loggedUser={loggedUser} />} />
                        <Route exact path="/perfil" render={(props) => loggedUser && <Profile {...props} loggedUser={loggedUser} />} />

                    </>)
                    : (
                        <Redirect to="/iniciar-sesion" />
                    ))
            }
            {/* <Route component={NotFound} /> */}
        </Switch>
    )
}
export default Routes