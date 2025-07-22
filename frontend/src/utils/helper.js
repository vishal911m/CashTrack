import moment from "moment";

export const validateEmail = (email) =>{
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
  return regex.test(email);
};

export const getInitials = (name) => {
  if(!name) return "" ;

  const words = name.split(" ");
  let initials = "";

  for(let i=0; i< Math.min(words.length, 2); i++){
    initials += words[i][0];
  }

  return initials.toUpperCase();
}

export const addThousandsSeperator = (num)=>{
  if(num == null  || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return fractionalPart 
   ? `${formattedInteger}.${fractionalPart}`
   : formattedInteger;
};

export const prepareExpenseBarChartData = (data = [])=>{
  const chartData = data.map((item)=>({
    month: moment(item?.date).format('Do MMM'),
    category: item?.category,
    amount: item?.amount,
  }));

  console.log('prepareExpenseBarChartData input:', data);
  console.log('prepareExpenseBarChartData output:', chartData);

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const monthCount = {};
  
  const chartData = sortedData.map((item) => {
    const rawMonth = moment(item?.date).format('Do MMM');

    // Track how many times this month label has occurred
    monthCount[rawMonth] = (monthCount[rawMonth] || 0) + 1;

    // Add non-breaking spaces to make duplicate labels unique on X-axis
    const uniqueMonth = rawMonth + '\u00A0'.repeat(monthCount[rawMonth] - 1);

    return {
      id: `${rawMonth} - ${item?.source}`, // Full ID for tooltip & internal use
      month: uniqueMonth, // Displayed on X-axis, visually same
      amount: item?.amount,
      source: item?.source,
    };
  });

  console.log('✅ Income chartData:', chartData);
  return chartData;
};
