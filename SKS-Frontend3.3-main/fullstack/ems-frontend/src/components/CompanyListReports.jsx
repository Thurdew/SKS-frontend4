import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listCompanies } from "../services/CompanyService";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import SideBar from "./SideBar";
import './CompanyReports.css';


export const ComapnyListReports = () => {

    const [companies, setCompanies] = useState([])
  
    const navigator = useNavigate();

    useEffect(() => {  
        getAllCompanies();
  
    },[])

    function getAllCompanies(){
        listCompanies().then((response) => {
            setCompanies(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    const detailRapor = () => {
        navigator('/companyRaportsDetails')
    }



    return (
        <div>
          <SideBar />
          <div className="container">
            <div className="table-container">
              <div className="table-header">
                <h2 className="text-center">Firma Raporları</h2> 
                <button className="btn btn-info" onClick={detailRapor}>Görüntüle</button>
              </div>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Firma</th>  
                  </tr>
                </thead>
                <tbody>
                  {companies.map(company => (
                    <tr key={company.id}>
                      <td>{company.companyName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <FooterComponent />
        </div>
      );
}

export default ComapnyListReports