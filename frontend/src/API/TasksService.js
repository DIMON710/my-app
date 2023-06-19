import axios from "axios";
const URL = 'https://dimension-server-for-my-app.onrender.com'
// const URL = 'http://localhost:5000'
export default class TasksService {

    static async addNew(name, body) {
        return await axios.post(`${URL}/api/tasks/add-new`, {
            name,
            body
            }
        );
    }

    static async getAll(limit = 10, page = 1) {
        return await axios.get(`${URL}/api/tasks/all`, {
            params: {
                limit,
                page
            }
        });
    }

    static async getOne(id) {
        return await axios.get(`${URL}/api/tasks/get-one/` + id);
    }

    static async setTask(id, val) {
        val === undefined && (val = true)
        return await axios.put(`${URL}/api/tasks/change`, {
                id,
                val
            }
        );
    }

    static async deleteTask(id) {
        return await axios.delete(`${URL}/api/tasks/delete/` + id);
    }
};