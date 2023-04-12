import React from 'react';
import {
    Switcher20
} from '@carbon/icons-react';
import  {
    Search,
    Button,
    Header,
    HeaderName,
    HeaderGlobalAction,
    HeaderGlobalBar,
    Switcher,
    SwitcherItem,
    HeaderPanel,
    SwitcherDivider,
    HeaderMenuButton,
    HeaderNavigation,
    HeaderMenuItem,
    HeaderMenu
}  from 'carbon-components-react';


const SearchPage = () => {
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
                       <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                       <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                   </HeaderMenu>
               </HeaderNavigation>
               <Switcher20 />
           </Header>

           <div className={'container'}>
               <div className="left">
                   {/* Left content */}
               </div>
               <div className="barraLateral">
                   <div className={'barraBusqueda'}>
                       <Search
                           size="lg"
                           placeholder="Find your items"
                           labelText="Search"
                           closeButtonLabelText="Clear search input"
                           id="search-1"
                           onChange={() => {}}
                           onKeyDown={() => {}}
                       />
                   </div>
               </div>
           </div>

       </>
   );
};

export default SearchPage;