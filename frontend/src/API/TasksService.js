import axios from "axios";

export default class TasksService {

    static async addNew(name, body) {
        return await axios.post('http://localhost:5000/api/tasks/add-new', {
            name,
            body
            }
        );
    }

    static async getAll(limit = 10, page = 1) {
        return await axios.get('http://localhost:5000/api/tasks/all', {
            params: {
                limit,
                page
            }
        });
    }

    static async getOne(id) {
        return await axios.get('http://localhost:5000/api/tasks/get-one/' + id);
    }

    static async setTask(id, val) {
        val === undefined && (val = true)
        return await axios.put('http://localhost:5000/api/tasks/change', {
                id,
                val
            }
        );
    }

    static async deleteTask(id) {
        return await axios.delete('http://localhost:5000/api/tasks/delete/' + id);
    }
};