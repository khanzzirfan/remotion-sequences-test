/**
 * Notes: useRef with Callbacks
 * https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
 * https://medium.com/welldone-software/usecallback-might-be-what-you-meant-by-useref-useeffect-773bc0278ae
 * https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
 */

import { useCallback, useRef } from "react";

function useHookWithRefCallback() {
  const ref = useRef(null);
  const setRef = useCallback((node) => {
    // console.log("node passed");
    // console.log(node);
    if (ref.current) {
      // Make sure to cleanup any events/references added to the last instance
    }

    if (node) {
      // Check if a node is actually passed. Otherwise node would be null.
      // You can now do what you need to, addEventListeners, measure, etc.
    }

    // Save a reference to the node
    ref.current = node;
  }, []);

  return [ref, setRef];
}
export default useHookWithRefCallback;
