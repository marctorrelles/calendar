class Request {
    constructor(base_url) {
        this.base_url = base_url;
        this.headers = {
            'Content-Type': 'application/json'
        };
    }
    async put(url, data, extra_headers = {}) {
        const headers = Object.assign({}, this.headers, { 'Content-Type': 'application/json' }, extra_headers);
        return await this.request({
            url,
            method: 'PUT',
            headers,
            data
        });
    }
    async delete(url, data, extra_headers = {}) {
        const headers = Object.assign({}, this.headers, { 'Content-Type': 'application/json' }, extra_headers);
        return await this.request({
            url,
            method: 'DELETE',
            headers,
            data
        });
    }
    async get(url, data, extra_headers = {}) {
        const headers = Object.assign({}, this.headers, extra_headers);
        return await this.request({
            url,
            method: 'GET',
            headers,
            data
        });
    }
    async post(url, data, extra_headers = {}) {
        const headers = Object.assign({}, this.headers, { 'Content-Type': 'application/json' }, extra_headers);
        return await this.request({
            url,
            method: 'POST',
            headers,
            data
        });
    }
    async request(params) {

        let url = this.base_url + '/' + (params.url || '');
        const method = params.method ? params.method.toUpperCase() : 'GET';
        const headers = (params.headers || {});
        const body = params.data;
        
        try {
            const request = {
                method,
                headers
            };

            if (['POST', 'DELETE', 'PUT'].indexOf(method) !== -1) {
                request.body = JSON.stringify(body);
            }

            if (['GET'].indexOf(method) !== -1) {
                url += '?' + this.urlEncode(params.data || {});
            }

            const response = await fetch(url, request);
            const data = await response.json();

            if (!response.ok) {
                return Object.assign({}, data, { success: false, code: 422, error: '', description: data.error });
            }

            return data;
        } catch (e) {
            console.log('error - ' + e);
            return null;
        }

    }
    urlEncode(properties) {
        let formBody = [];
        for (const property in properties) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(properties[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        return formBody;
    }
}

export { Request as default };
