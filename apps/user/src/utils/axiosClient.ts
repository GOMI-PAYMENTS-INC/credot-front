import Axios, { AxiosResponse } from 'axios';

import {GlobalEnv} from "@/utils/config";

export const axiosClient = Axios.create({ baseURL: GlobalEnv.baseUrl });
