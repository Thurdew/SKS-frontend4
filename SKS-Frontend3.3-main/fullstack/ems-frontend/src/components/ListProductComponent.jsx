import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, listProducts } from '../services/ProductService';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import SideBar from './SideBar';
import './ListProductComponent.css'; // Harici CSS dosyası

export const ListProductComponent = () => {
    const [products, setProducts] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllProducts();
    }, []);

    function getAllProducts() {
        listProducts().then((response) => {
            setProducts(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function addNewProducts() {
        navigator('/add-product');
    }

    function updateProduct(id) {
        navigator(`/edit-product/${id}`);
    }

    function removeProduct(id) {
        deleteProduct(id).then((response) => {
            getAllProducts();
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div>
            <SideBar />
            <div className='container1'>
                <h2 className='text-center'>Ürün Listesi</h2>
                <button className='btn btn-primary mb-2' onClick={addNewProducts}>Ürün Ekle</button>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Ürün Id</th>
                            <th>Ürün Adı</th>
                            <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product =>
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.productName}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateProduct(product.id)}>Güncelle</button>
                                    <button className='btn btn-danger' onClick={() => removeProduct(product.id)} style={{ marginLeft: '10px' }}>Sil</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="background-logo"></div> {/* Şeffaf logo */}
            <FooterComponent />
        </div>
    );
}

export default ListProductComponent;
