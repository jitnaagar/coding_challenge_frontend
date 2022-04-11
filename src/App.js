import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './App.css';
import Popup from './Popup'; 

function App() {
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1); // No of pages
  const [perPage, setPerPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumber.push(i);
  }

  const handleSearch = (event) => {
    localStorage.setItem("currentPage", 1);
    localStorage.setItem("currentSearch", event.target.value);
    setPage(1)
    setSearch(event.target.value);
  };

  const handlePage = (event) => {
    localStorage.setItem("currentPage", event.target.value);
    setPage(event.target.value);
  }

  const handleTogglePopup = (event) => {  
    setShowPopup(!showPopup) 
  }  

  useEffect(() => {
    const currentPage = localStorage.getItem("currentPage")?localStorage.getItem("currentPage"):page;
    const currentSearch = localStorage.getItem("currentSearch")?localStorage.getItem("currentSearch"):search;
    setSearch(currentSearch)
    setPage(currentPage);
    const fetchCustomers = async () => {
      const { data } = await Axios.get(
        "http://localhost:3000/api/customers?search="+search+"&page="+page
      );
      setTotal(data.count);
      setPerPage(data.limit);
      setCustomers(data.customers);
    };
    fetchCustomers();
  }, [search,page]);
  return (
    <div className="App">
      <h1>Retrieve list of customers</h1>
      
      <div className="search"><label htmlFor="search">
        Search by username:
        <input id="search" type="text" value={search} onChange={handleSearch} />
      </label>
      </div>
      <div>  
       
</div> 
      
      <table>
    
    <thead>
      <tr>
        <th>Full Name</th>
        <th>Username</th>
        <th>email</th>
        <th>Picture</th>
      </tr>
    </thead>
    <tbody>
    {customers.map((customer) => (
    <tr>
     <td data-label="fullName">{customer.full_name}</td>
     <td data-label="username">{customer.username}</td>
     <td data-label="email">{customer.email}</td>
     <td data-label="picture">
     <button onClick={handleTogglePopup.bind(this)}> <img src={customer.picture} width="50" alt=""/></button>  
      {showPopup ?  
      <Popup  
        text='X'  
        image={customer.picture}
        closePopup={handleTogglePopup.bind(false)}  
      />  
      : null  
      } 
     </td>
    </tr>
    ))}
    </tbody>
  </table>
  <div className="pagination">
            {/* <button>
              Previous
            </button> */}
 
            {pageNumber.map((Elem) => {
              return (
                <>
                  <button value={Elem} onClick={handlePage}>
                    {Elem}
                  </button>
                </>
              );
            })}
            {/* <button>
              Next
            </button> */}
          </div>
    </div>
  );
}

export default App;
