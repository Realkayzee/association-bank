  // bringing multiple class name together for better code organization
  interface customThemeProp {
    text_gradient: string;
    floating_input: string;
    floating_label: string;
    fill_button: string;
    outline_button: string
    button_span: string;
    link: string;
  }

  export const customTheme: customThemeProp = {
    text_gradient: "text-transparent bg-clip-text bg-gradient-to-r from-goldenyellow to-amber-200 tracking-wider",
    floating_input: "block py-2.5 px-0 w-full text-md text-neutral-300 bg-transparent border-0 border-b-2 border-amber-400 appearance-none focus:outline-none focus:ring-0 focus:border-amber-200 peer",
    floating_label: "peer-focus:font-medium absolute text-md text-neutral-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
    fill_button: "bg-gradient-to-r from-amber-500 via-amber-300 to-goldenyellow hover:bg-gradient-to-bl focus:opacity-80 font-bold font-xl rounded-lg text-md px-5 py-2.5 text-center",
    outline_button: "relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-md font-semibold text-neutral-300 rounded-lg group bg-gradient-to-br from-amber-500 via-amber-300 to-goldenyellow group-hover:from-amber-500 group-hover:via-amber-300 group-hover:to-goldenyellow hover:text-black focus:outline-none active:opacity-80",
    button_span: "relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0",
    link: "font-medium tracking-wider p-2 rounded-md border border-transparent hover:border-neutral-300",
  }