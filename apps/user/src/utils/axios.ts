import Axios, { AxiosResponse } from 'axios';

import {GlobalEnv} from "@/utils/config";

export const axios = Axios.create({ baseURL: GlobalEnv.baseUrl });
