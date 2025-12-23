import Navbar from "@/components/Navbar/Navbar";


const HomeLayout = async({ children } : { children: React.ReactNode }) => {

  return (
     <>
     
     <Navbar >
     </Navbar>
     {children}
     </>
  )
}

export default HomeLayout;