import axios from 'axios';

const REPFORA = process.env.REPFORA;

const  validateAdmin = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({
            msg: 'Token no proveído'
        });
    }
    try {
        const validate = await axios.post(`${REPFORA}/api/users/token/productive/stages`, null, {
            headers: { token: token }
        });

        console.log("Respuesta del Api:", validate.data);

        if (validate.data.token === true) {
            console.log('Validación correcta:', validate.data);
            
            req.userData = validate.data;

            return next(); 
        } else {
            return res.status(400).json({
                msg: 'Token inválido',
                data: validate.data
            });
        }
    } catch (error) {
        return res.status(error.response?.status || 500).json({
            message: error.response?.data?.message || error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
};

export {  validateAdmin };
