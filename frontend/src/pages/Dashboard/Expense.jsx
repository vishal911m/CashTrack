import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPath';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';

const Expense = () => {
  useUserAuth();
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  
  //get all expense details
  const fetchExpenseDetails = async() => {
    if(loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if(response.data){
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again", error);
    } finally {
      setLoading(false);
    }
  };

  //handle all expense
  const handleAllExpense = async(expense) =>{
    const {category, amount, date, icon} = income;

    //validation checks
    if(!category.trim()){
      toast.error("Category is required");
      return;
    } 

    if(!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number, greater than 0");
      return;
    }

    if(!date){
      toast.error("Date is required");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category, 
        amount, 
        date,
        icon
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully"); 
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error adding expense",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(()=>{
    fetchExpenseDetails();

    return ()=>{}
  },[])
  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'></div>
    </DashboardLayout>
  )
}

export default Expense