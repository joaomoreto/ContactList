export class UserUtil {

    static get(): any {
        const data = localStorage.getItem('contactlist.user')

        if (!data)
            return null;

        return JSON.parse(data);
    }

    static set(data): any {
        localStorage.setItem('contactlist.user', JSON.stringify(data));

    }

    static clear(): any {
        localStorage.removeItem('contactlist.user');
    }
}