/* this file exists to overcome (serious) build issues with @grafana/runtime. */
let locationService = {
    partial: (loc: any, b: boolean)=>{
        console.log("partial called with", loc, b);
    }
}

// finally we pass out the result of all these manipulations as 'locationService'
export { locationService };
