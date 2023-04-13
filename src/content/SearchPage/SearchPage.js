import React, {useEffect} from 'react';
import {
    Switcher20
} from '@carbon/icons-react';
import  {
    Search,
    Button,
    Header,
    HeaderName,
    HeaderMenuButton,
    HeaderNavigation,
    HeaderMenuItem,
    HeaderMenu,
    Dropdown
}  from 'carbon-components-react';
import {Link} from "react-router-dom";

const items = [
    { id: 'option1', text: 'Option 1' },
    { id: 'option2', text: 'Option 2' },
    { id: 'option3', text: 'Option 3' },
];

const SearchPage = () => {
    useEffect(() => {
        const maxScrollHeight = 33; // set your maximum scroll height here
        const handleScroll = () => {
            if (window.scrollY > maxScrollHeight) {
                window.scrollTo(0, maxScrollHeight);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
   return(
       <>
           <Header aria-label="IBM Platform Name">
               <HeaderMenuButton
                   aria-label="Open menu"
                   onClick={() => {}}
                   isActive={false}
               />
               <HeaderName href="#" prefix="IBM">
                   Certifications Dashboard
               </HeaderName>
               <HeaderNavigation aria-label="IBM [Platform Name]" hasDivider className={'align-right'}>
                   <HeaderMenu menuLinkName="Menu">
                       <HeaderMenuItem href="#/loginpage">Login Page</HeaderMenuItem>
                       <HeaderMenuItem href="/">Landing Page</HeaderMenuItem>
                       <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                   </HeaderMenu>
               </HeaderNavigation>
               <Switcher20 />
           </Header>

           <div className={'container'}>
               <div className="left">
               </div>
               <div className="barraLateral">
                   <div className={'divisionFormat'}>
                       <div className={'dropDown'}>
                           <Dropdown
                               id="default"
                               label="Seleccione un conjunto de datos"
                               items={items}
                               itemToString={(item) => (item ? item.text : '')}
                           />
                       </div>

                   </div>

                   <p className={'divisionFormat'}>Ingrese el uid del empleado</p>

                   <div className={'searchRow'}>
                       <div className={'searchBarDiv'}>

                           <Search/>
                       </div>
                       <div className={'searchButtonDiv'}>
                           <Link to="/loginpage">
                               <Button>Buscar</Button>
                           </Link>
                       </div>

                   </div>
               </div>
           </div>
       </>
   );
};

export default SearchPage;