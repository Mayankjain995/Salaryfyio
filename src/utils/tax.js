export const taxSlabs = {
  old: [
    { limit: 250000, rate: 0, cess: 0 },
    { limit: 500000, rate: 5, cess: 4 },
    { limit: 1000000, rate: 20, cess: 4 },
    { limit: Infinity, rate: 30, cess: 4 }
  ],
  new: [
    { limit: 300000, rate: 0, cess: 0 },
    { limit: 600000, rate: 5, cess: 4 },
    { limit: 900000, rate: 10, cess: 4 },
    { limit: 1200000, rate: 15, cess: 4 },
    { limit: 1500000, rate: 20, cess: 4 },
    { limit: Infinity, rate: 30, cess: 4 }
  ]
};

export const calculateTax = (income, regime) => {
  const slabs = taxSlabs[regime];
  let tax = 0;
  let remainingIncome = income;

  for (let i = 0; i < slabs.length; i++) {
    const slab = slabs[i];
    const prevLimit = i === 0 ? 0 : slabs[i - 1].limit;
    const slabWidth = slab.limit - prevLimit;

    if (remainingIncome <= 0) break;

    const taxableInSlab = Math.min(remainingIncome, slabWidth);
    const slabTax = (taxableInSlab * slab.rate) / 100;
    const cess = (slabTax * slab.cess) / 100;
    
    tax += slabTax + cess;
    remainingIncome -= slabWidth;
  }

  return Math.round(tax);
};
