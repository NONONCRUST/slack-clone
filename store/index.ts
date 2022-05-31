import {
  AnyAction,
  combineReducers,
  configureStore,
  Store,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import {
  TypedUseSelectorHook,
  useDispatch as typedUseDispatch,
  useSelector as typedUseSelector,
} from "react-redux";
import user from "./userSlice";
import channel from "./channelSlice";

const combinedReducer = combineReducers({
  user,
  channel,
});

const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    console.log("@@@ HYDRATE @@@");
    const nextState = {
      ...state,
      ...action.payload,
    };

    return nextState;
  }

  return combinedReducer(state, action);
};

export type RootState = ReturnType<Store["getState"]>;
export type AppDispatch = any; // Store["dispatch"]

export const useDispatch = () => typedUseDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = typedUseSelector;

const makeStore: MakeStore<any> = () =>
  configureStore({
    reducer,
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
