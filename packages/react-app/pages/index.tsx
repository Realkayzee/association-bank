import AssociationList from "@/components/AssociationList";
import Deposit from "@/components/Deposit";
import CreateAccount from "@/components/createAccount";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';



function Home() {

  return (
    <div>
      <section className="p-20 mt-16">
        <h1 className="text-5xl text-center font-semibold tracking-wide">
          Welcome to Celo Association Bank
        </h1>
        <p className="text-center italic font-semibold text-xl mt-1 text-neutral-400">
          Become a member of celo association bank by creating an account
        </p>
        <CreateAccount />
        {/* Deposit component addition */}
        <Deposit />
      </section>
      <section id="account-list" className="p-20 my-32 bg-neutral-800 rounded-lg">
        <AssociationList />
      </section>
    </div>
  )
  
}

export default React.memo(Home)
