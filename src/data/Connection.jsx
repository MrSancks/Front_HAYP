import axios from 'axios';

export const Connection = async () => {
    const url = "https://localhost:7168/api/Scrap";
    const res = await axios.get(url);
    return res.data;
}
export default Connection;