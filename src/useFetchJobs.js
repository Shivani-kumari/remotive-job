import axios from "axios"
import { useEffect, useReducer } from "react"

const ACTIONS = {
    MAKE_REQUEST:'make-request',
    GET_DATA:'get-data',
    ERROR:'error',
    UPDATE_HAS_NEXT_PAGE:'update-has-next-page'
}
const BASE_URL = ' https://remotive.io/api/remote-jobs'
function reducer(state,action){
  switch (action.type){
      case ACTIONS.MAKE_REQUEST:
            return {loading:true,jobs:[]}
      case ACTIONS.GET_DATA:
        return {...state, loading:false , jobs:action.payload.jobs}
      case ACTIONS.ERROR:
        return {...state,loading:false,error:action.payload.error,jobs:[]}
      case ACTIONS.UPDATE_HAS_NEXT_PAGE:
          return {...state,hasNextPage: action.payload.hasNextPage}
        default:
            return state
  }
}
export default function useFetchJobs(params,limit){
    const [state,dispatch] = useReducer(reducer,{jobs:[],loading:true})
    useEffect(()=>{
        const cancelToken = axios.CancelToken.source()
        dispatch({type:ACTIONS.MAKE_REQUEST})
        axios.get(BASE_URL,{
            cancelToken:cancelToken.token,
            params:{limit:limit,...params}
        }).then(res => {
            dispatch({type: ACTIONS.GET_DATA, payload:{jobs:res.data.jobs}})
        }).catch(e => {
            if(axios.isCancel(e)) return
            dispatch({type: ACTIONS.ERROR,payload:{error:e}})
        })

        const cancelToken2 = axios.CancelToken.source()
        
        axios.get(BASE_URL,{
            cancelToken:cancelToken2.token,
            params:{limit:limit+5,...params}
        }).then(res => {
            dispatch({type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload:{hasNextPage:res.data.jobs.length !==0}})
        }).catch(e => {
            if(axios.isCancel(e)) return
            dispatch({type: ACTIONS.ERROR,payload:{error:e}})
        })
        return () =>{
            cancelToken.cancel()
            cancelToken2.cancel()
        }
    },[params,limit])
    return state
}