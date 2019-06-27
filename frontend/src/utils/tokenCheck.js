import {SecureStore} from "expo/build/Expo";
import {getToken, refreshToken} from "../services/Authentication";


export const checkToken = async () => {
    let time, token, refresh_token;
    await SecureStore.getItemAsync('time')
        .then((response) => {
            time = response;
            console.log('Time Diff =====', (Date.now() - parseInt(time)) / 36e5)
            if ((Date.now() - parseInt(time)) / 36e5 >= 1) {
                SecureStore.setItemAsync('time', Date.now().toString());
                SecureStore.getItemAsync('refresh_token')
                    .then((response) => {
                        refresh_token = response;
                        refreshToken(refresh_token)
                            .then((response) => {
                                return response.json();
                            })
                            .then((response) => {
                                SecureStore.setItemAsync('token', response.access_token);
                            })
                            .catch((error) => {
                                console.log(error)
                            });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}