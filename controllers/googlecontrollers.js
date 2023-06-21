import User from "../modules/user.js";
import encrypt from "encryptjs";
import axios from "axios";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const response = await User.find({ email }).exec();
        if (response.length) return res.send("email is already in use");

        const secretpass = "pass";
        const encryptpass = encrypt.encrypt(password, secretpass, 256);

        const user = new User({
            name,
            email,
            password: encryptpass
        });

        await user.save();
        return res.send("registration successful.")
    } catch (error) {
        return res.send(error)
    }
}

export const detect = async (req, res) => {
    try {
        const encodedParams = new URLSearchParams();
        encodedParams.set('q', 'English is hard, but detectably so');
        console.log("hello")
        const options = {
            method: 'POST',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': '1b36ac4e46msh9c9d8c83b49c50ap114021jsn14e58e8aa2a3',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            },
            data: encodedParams,
        };
        const response = await axios.request(options);
        console.log(response.data);
        res.send(response.data);
    } catch (error) {
        return res.send(error)
    }
}

export const languages = async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
            headers: {
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': '1b36ac4e46msh9c9d8c83b49c50ap114021jsn14e58e8aa2a3',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        res.send(response.data);
    } catch (error) {
        return res.send(error)
    }
}

export const translate = async (req, res) => {
    try {
        const encodedParams = new URLSearchParams();
        encodedParams.set('q', 'Hello, world!');
        encodedParams.set('target', 'cs');
        encodedParams.set('source', 'en');

        const options = {
            method: 'POST',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': '1b36ac4e46msh9c9d8c83b49c50ap114021jsn14e58e8aa2a3',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            },
            data: encodedParams,
        };


        const response = await axios.request(options);
        res.send(response.data);
    } catch (error) {
        return res.send(error);
    }
}