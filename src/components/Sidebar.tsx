// import { useEffect, useState } from 'react'
// // import { useCalendar } from '../context/CalendarContext'
// // import { getMonthData, } from '../utils/calendar'
// // import type { MonthData } from '../types/calendar'

// const Sidebar = () => {
//   // const { state } = useCalendar()
//   // const [monthData, setMonthData] = useState<MonthData | null>(null)
//   // const [isCollapsed, setIsCollapsed] = useState(false)
//   const [isMobileDrawer, setIsMobileDrawer] = useState(false)

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobileDrawer(window.innerWidth < 1024)
//     }
//     handleResize()
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   // useEffect(() => {
//   //   const loadMonthData = async () => {
//   //     try {
//   //       const data = await getMonthData(state.currentYear, state.currentMonth)
//   //       // setMonthData(data)
//   //     } catch (error) {
//   //       console.error('Failed to load month data:', error)
//   //     }
//   //   }

//   //   loadMonthData()
//   // }, [state.currentYear, state.currentMonth])

//   // if (!monthData || state.selectedDate === null) {
//   //   return (
//   //     <aside className={`
//   //       fixed lg:static inset-y-0 right-0 w-full sm:w-80 bg-white shadow-lg lg:shadow-none
//   //       transform transition-transform duration-300 ease-in-out
//   //       ${isMobileDrawer ? 'translate-x-full' : ''}
//   //       ${isCollapsed ? 'lg:w-0 lg:overflow-hidden' : ''}
//   //     `}>
//   //       <div className="flex items-center justify-center h-full text-gray-500">
//   //         {state.language === 'ne' ? 'मिति छान्नुहोस्' : 'Select a date'}
//   //       </div>
//   //     </aside>
//   //   )
//   // }

//   // const selectedDay = monthData.days[state.selectedDate]
//   // if (!selectedDay) return null

//   // const toggleSidebar = () => {
//   //   if (isMobileDrawer) {
//   //     setIsMobileDrawer(false)
//   //   } else {
//   //     setIsCollapsed(!isCollapsed)
//   //   }
//   // }

//   return (
//     // <aside className={`
//     //   fixed lg:static inset-y-0 right-0 w-full sm:w-80 bg-white shadow-lg lg:shadow-none
//     //   transform transition-transform duration-300 ease-in-out border-l border-gray-200
//     //   ${isMobileDrawer ? 'translate-x-full' : ''}
//     //   ${isCollapsed ? 'lg:w-0 lg:overflow-hidden' : ''}
//     // `}>
//       {/* <div className="h-full flex flex-col">
        
//         <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
//           <h2 className="text-lg font-semibold text-gray-900">
//             {state.language === 'ne' ? 'छानिएको मिति विवरण' : 'Selected Date Details'}
//           </h2>
//           <button 
//             onClick={toggleSidebar}
//             className="text-gray-500 hover:text-gray-700 focus:outline-none p-1 hover:bg-gray-100 rounded-md transition-colors"
//             aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? 'M13 5l7 7-7 7' : 'M11 19l-7-7 7-7'} />
//             </svg>
//           </button>
//         </div>

//      ]
//         <div className="flex-1 overflow-y-auto scrollbar-custom">
//           <div className="p-4 space-y-4">
         
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <h3 className="font-medium text-gray-900 mb-2">
//                 {state.language === 'ne' ? 'मिति' : 'Date'}
//               </h3>
//               <p className="text-lg mb-1">
//                 {state.language === 'ne' 
//                   ? `${selectedDay.bs} ${NEPALI_MONTHS.ne[state.currentMonth - 1]} ${toNepaliDigits(state.currentYear)}`
//                   : `${selectedDay.bs} ${NEPALI_MONTHS.en[state.currentMonth - 1]} ${state.currentYear}`
//                 }
//               </p>
//               <p className="text-sm text-gray-600">
//                 {selectedDay.ad}
//               </p>
//             </div>

            
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <h3 className="font-medium text-gray-900 mb-2">
//                 {state.language === 'ne' ? 'तिथि' : 'Tithi'}
//               </h3>
//               <p className="text-gray-700">{selectedDay.tithi}</p>
//             </div>

       
//             {selectedDay.events.length > 0 && (
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-medium text-gray-900 mb-2">
//                   {state.language === 'ne' ? 'कार्यक्रमहरू' : 'Events'}
//                 </h3>
//                 <ul className="space-y-2">
//                   {selectedDay.events.map((event, index) => (
//                     <li key={index} className="flex items-start gap-2 text-gray-700">
//                       <span className="text-primary-500">•</span>
//                       <span>{event}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

        
//             {selectedDay.horoscope && (
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-medium text-gray-900 mb-2">
//                   {state.language === 'ne' ? 'राशिफल' : 'Horoscope'}
//                 </h3>
//                 <p className="text-gray-700 text-sm leading-relaxed">
//                   {selectedDay.horoscope}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div> */}
//     // </aside>
//   )
// }

// export default Sidebar 

import React from 'react'

const Sidebar = () => {
  return (
    <div></div>
  )
}

export default Sidebar