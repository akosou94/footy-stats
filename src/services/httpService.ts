import axios from "axios";

export const makeHttpService = (baseURL: string, headers?: Record<string, string>) => {
	return axios.create({
		baseURL, headers
	})
}

