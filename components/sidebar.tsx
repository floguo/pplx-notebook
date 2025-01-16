import Link from 'next/link'

export function Sidebar() {
  return (
    <aside className="w-64 bg-[#202222] flex flex-col h-screen">
      <div className="flex-1 pl-2 py-4">
        <div className="flex items-center justify-start mx-4 mb-8">
          <svg width="142" height="31" viewBox="0 0 142 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M4.10634 0.495728L12.7749 8.48247V8.48064V0.514157H14.4623V8.51821L23.1696 0.495728V9.60179H26.7445V22.7364H23.1806V30.8449L14.4623 23.1853V30.9329H12.7749V23.3116L4.11617 30.9379V22.7364H0.541138V9.60179H4.10634V0.495728ZM11.5027 11.2686H2.22855V21.0696H4.11405V17.978L11.5027 11.2686ZM5.80349 18.7176V27.2186L12.7749 21.0784V12.3856L5.80349 18.7176ZM14.5108 20.9972V12.3774L21.4842 18.7098V22.7364H21.4932V27.1318L14.5108 20.9972ZM23.1806 21.0696H25.0571V11.2686H15.852L23.1806 17.9086V21.0696ZM21.4822 9.60179V4.32974L15.76 9.60179H21.4822ZM11.5158 9.60179H5.79376V4.32974L11.5158 9.60179Z" fill="#21B8CD"/>
            <path d="M68.435 9.40183H69.5064V11.6097H68.1195C67.0326 11.6097 66.2221 11.8711 65.6848 12.3956C65.1507 12.9184 64.8821 13.7783 64.8821 14.9735V22.213H62.6926V9.45221H64.8821V11.4885C64.8821 11.6034 64.9399 11.6601 65.0524 11.6601C65.1164 11.6601 65.1648 11.6443 65.1992 11.6113C65.2335 11.5782 65.2631 11.5136 65.2975 11.4144C65.7192 10.0743 66.7671 9.40337 68.4365 9.40337H68.435V9.40183ZM82.9995 12.1373C83.5742 13.1593 83.8631 14.3909 83.8631 15.8302C83.8631 17.2696 83.5757 18.5012 82.9995 19.5232C82.4232 20.5453 81.6767 21.3106 80.7599 21.8177C79.8433 22.3248 78.8578 22.5784 77.8037 22.5784C75.7266 22.5784 74.2664 21.7437 73.4231 20.0744C73.359 19.9437 73.2763 19.8775 73.1795 19.8775C73.0826 19.8775 73.0326 19.9263 73.0326 20.0256V26.8729H70.8431V9.45058H73.0326V11.6349C73.0326 11.7325 73.0811 11.783 73.1795 11.783C73.2778 11.783 73.3575 11.7183 73.4231 11.5861C74.2664 9.91675 75.7266 9.08209 77.8037 9.08209C78.8578 9.08209 79.8433 9.33565 80.7599 9.84276C81.6767 10.3499 82.4216 11.1152 82.9995 12.1373ZM81.6751 15.8302C81.6751 14.3247 81.2738 13.1514 80.471 12.309C79.6684 11.4664 78.6111 11.0459 77.2945 11.0459C75.978 11.0459 74.9207 11.4679 74.1181 12.309C73.3137 13.1514 73.0202 14.3262 73.0202 15.8302C73.0202 17.3342 73.3153 18.5091 74.1181 19.3515C74.9207 20.1957 75.9796 20.6146 77.2945 20.6146C78.6095 20.6146 79.6684 20.1925 80.471 19.3515C81.2738 18.5106 81.6751 17.3342 81.6751 15.8302ZM46.1244 12.1562C46.6992 13.1782 46.9881 14.4098 46.9881 15.8491C46.9881 17.2886 46.7007 18.52 46.1244 19.5421C45.5482 20.5642 44.8017 21.3296 43.885 21.8366C42.9683 22.3437 41.9829 22.5973 40.9287 22.5973C38.8517 22.5973 37.3914 21.7626 36.5481 20.0933C36.4841 19.9626 36.4013 19.8965 36.3044 19.8965C36.2076 19.8965 36.1577 19.9452 36.1577 20.0445V26.8918H33.9697V9.46955H36.1593V11.6538C36.1593 11.7515 36.2076 11.8018 36.3061 11.8018C36.4044 11.8018 36.4841 11.7373 36.5497 11.6049C37.393 9.93563 38.8532 9.10097 40.9303 9.10097C41.9844 9.10097 42.9698 9.35453 43.8866 9.86164C44.8033 10.3688 45.5483 11.1341 46.1261 12.1562H46.1244ZM44.7986 15.8491C44.7986 14.3436 44.3972 13.1704 43.5946 12.3278C42.7918 11.4868 41.733 11.0648 40.418 11.0648C39.1031 11.0648 38.0443 11.4868 37.2415 12.3278C36.4388 13.1719 36.1436 14.3452 36.1436 15.8491C36.1436 17.3531 36.4388 18.5279 37.2415 19.3705C38.0443 20.2146 39.1014 20.6335 40.418 20.6335C41.7345 20.6335 42.7918 20.2114 43.5946 19.3705C44.3972 18.5295 44.7986 17.3531 44.7986 15.8491ZM58.8227 18.1595H61.1341C60.8264 19.3547 60.197 20.3893 59.2491 21.2634C58.2995 22.139 56.9409 22.5752 55.1715 22.5752C53.8409 22.5752 52.6696 22.3012 51.6561 21.7532C50.6425 21.2051 49.8601 20.4256 49.3072 19.4098C48.7544 18.3957 48.4796 17.2019 48.4796 15.8271C48.4796 14.4522 48.7482 13.2585 49.2822 12.2443C49.8163 11.2302 50.5676 10.449 51.5327 9.90104C52.4978 9.35299 53.6284 9.07891 54.9263 9.07891C56.224 9.07891 57.3 9.34981 58.1996 9.88842C59.1007 10.4286 59.7722 11.1451 60.2189 12.0349C60.6655 12.9278 60.8873 13.9042 60.8873 14.9673V16.4397H50.7893C50.8689 17.7153 51.2968 18.7311 52.0667 19.4822C52.8367 20.235 53.8721 20.6114 55.1699 20.6114C56.224 20.6114 57.033 20.3957 57.5921 19.961C58.1511 19.5264 58.5604 18.9264 58.8211 18.1563L58.8227 18.1595ZM50.744 14.6019H58.3854C58.3854 13.49 58.1012 12.6176 57.5327 11.9877C56.9643 11.3593 56.0726 11.0427 54.856 11.0427C53.7206 11.0427 52.7914 11.3498 52.0699 11.9641C51.3484 12.5767 50.9065 13.457 50.744 14.6019ZM85.6293 22.2099H87.8204V4.54187H85.6293V22.2114V22.2099ZM116.423 8.05688H118.981V5.29464H116.423V8.05688ZM125.869 20.3091C125.472 20.35 125.231 20.3705 125.152 20.3705C125.039 20.3705 124.947 20.3374 124.883 20.2712C124.818 20.2067 124.785 20.1169 124.785 20.0003C124.785 19.9201 124.806 19.6775 124.847 19.276C124.886 18.876 124.908 18.257 124.908 17.4239V11.3183H128.031L127.416 9.44904H124.909V6.01276H122.72V9.44749H120.338V11.3168H122.72V18.035C122.72 19.4429 123.062 20.4901 123.742 21.1768C124.423 21.8634 125.462 22.2083 126.859 22.2083H128.562V20.2461H127.709C126.882 20.2461 126.269 20.2665 125.871 20.3075L125.869 20.3091ZM139.105 9.44904L135.479 20.1563C135.431 20.2886 135.354 20.4602 135.106 20.4602C134.858 20.4602 134.78 20.2886 134.73 20.1563L131.104 9.44904H128.871L133.071 22.2099H134.556C134.652 22.2099 134.727 22.2193 134.777 22.235C134.825 22.2508 134.865 22.2918 134.898 22.3579C134.962 22.4556 134.954 22.6035 134.873 22.7989L134.192 24.6635C134.094 24.9091 133.908 25.032 133.633 25.032C133.535 25.032 133.309 25.0114 132.952 24.9705C132.595 24.9296 132.134 24.9091 131.566 24.9091H129.788V26.8713H132.125C133.488 26.8713 134.308 26.6383 135.014 26.1721C135.72 25.706 136.266 24.8839 136.656 23.706L141.192 9.93881V9.44904H139.108H139.105ZM109.012 14.2098L105.58 9.44904H103.171V9.93881L107.282 15.4601L102.269 21.7185V22.2083H104.728L108.719 17.079L112.442 22.2083H114.803V21.7185L110.446 15.8287L115.169 9.96405V9.44904H112.711L109.013 14.2098H109.012ZM116.656 22.2099H118.847V9.45058H116.656V22.2114V22.2099ZM102.239 18.1595C101.93 19.3547 101.303 20.3893 100.355 21.2634C99.405 22.139 98.0467 22.5752 96.277 22.5752C94.9466 22.5752 93.7751 22.3012 92.7617 21.7532C91.7463 21.2051 90.966 20.4256 90.4129 19.4098C89.8616 18.3957 89.5867 17.2019 89.5867 15.8271C89.5867 14.4522 89.8553 13.2585 90.3895 12.2443C90.9255 11.2302 91.675 10.449 92.6403 9.90104C93.6046 9.35299 94.7356 9.07891 96.0352 9.07891C97.3347 9.07891 98.4089 9.34981 99.3096 9.88842C100.209 10.4286 100.883 11.1451 101.329 12.0349C101.776 12.9278 101.997 13.9042 101.997 14.9673V16.4397H91.8985C91.9794 17.7153 92.4052 18.7311 93.1759 19.4822C93.9456 20.235 94.9813 20.6114 96.2789 20.6114C97.3328 20.6114 98.142 20.3957 98.7008 19.961C99.2595 19.5264 99.669 18.9264 99.9281 18.1563H102.241L102.239 18.1595ZM91.9043 14.6019H99.5457C99.5457 13.49 99.2615 12.6176 98.695 11.9877C98.1257 11.3593 97.2346 11.0427 96.0178 11.0427C94.882 11.0427 93.9534 11.3498 93.2318 11.9641C92.5102 12.5767 92.0671 13.457 91.9062 14.6019H91.9043Z" fill="#E8E8E6"/>
          </svg>
        </div>
        
        <button className="flex items-center justify-between w-full px-4 py-3 text-sm bg-[#191A1A] rounded-full mb-6">
          <span className="text-gray-400">New Thread</span>
          <div className="flex items-center gap-1">
            <span className="flex items-center justify-center w-5 h-5 bg-[#2A2A2A] rounded-md text-[11px] text-gray-400 font-medium">⌘</span>
            <span className="flex items-center justify-center w-5 h-5 bg-[#2A2A2A] rounded-md text-[11px] text-gray-400 font-medium">K</span>
          </div>
        </button>

        <nav className="space-y-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-white/5 rounded-lg btn-page-shrink">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Home
          </Link>
          <div className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-white/5 rounded-lg btn-page-shrink">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
            Discover
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-white/5 rounded-lg btn-page-shrink">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Spaces
          </div>
          <Link href="/study" className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-white/5 rounded-lg btn-page-shrink">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <g transform="scale(1.1) translate(-1.2, -1.2)">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </g>
            </svg>
            Study
          </Link>
          <div className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-white/5 rounded-lg btn-page-shrink">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            Library
          </div>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800/40">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-[#1A2B41] flex items-center justify-center text-[#21B8CD] text-sm font-medium">
            F
          </div>
          <span className="text-sm text-gray-400">floguo</span>
        </div>
      </div>
    </aside>
  )
}

