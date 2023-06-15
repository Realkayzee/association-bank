import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

interface customProp {
    color: string;
    text: string;
}


export const CustomConnector = (props: customProp) => {
    const {color, text} = props
    

    return (
        <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');
  
          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button onClick={openConnectModal} type="button" className={`${color} px-4 py-2 rounded-lg ${text} font-semibold`}>
                      Connect Wallet
                    </button>
                  );
                }
  
                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button" className={`bg-red-500 px-4 py-2 rounded-lg ${text} font-semibold`}>
                      Wrong network
                    </button>
                  );
                }
  
                return (
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button
                      onClick={openChainModal}
                      style={{ display: 'flex', alignItems: 'center' }}
                      type="button"
                      className={`px-4 py-2 rounded-lg ${color} ${text} font-semibold hover:opacity-80`}
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 20,
                            height: 20,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <Image
                            width={20}
                            height={20}
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>
  
                    <button onClick={openAccountModal} type="button" className={`px-4 py-2 rounded-lg ${color} ${text} font-semibold hover:opacity-80`}>
                      {account.displayName}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
  
    )
}