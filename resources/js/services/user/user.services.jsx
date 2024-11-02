import axios from "axios";

export const svGetUsers = () => {
    return axios
        .get("/api/getuser")
        .then((res) => {
            console.log(res.data.data);
            return {
                user: res.data.data.user,
                roles: res.data.data.role,
            };
        })
        .catch((err) => err);
};

export const svGetCateBackOffice = () => {
    return axios
        .get("/api/getcatebackoffice")
        .then((res) => {
            console.log(res);
            return { role: res.data.data.role, cate: res.data.data.cate };
        })
        .catch((err) => {
            return err;
        });
};

export const svCreateNewCate = (data) => {
    return axios
        .post("/api/createnewcate", {role_name : data})
        .then((res) => {
            console.log(res);
            return { status: res.data.status, roles: res.data.data };
        })
        .catch((err) => {
            return err;
        });
};

export const svSaveChangeCate = (params) => {
    return axios
        .post("/api/savechangecate", params)
        .then((res) => res)
        .catch((err) => err);
};

export const svUpdateUser = (params) => {
    return axios
        .post("/api/updateuser", params)
        .then((res) => res)
        .catch((err) => err);
};
