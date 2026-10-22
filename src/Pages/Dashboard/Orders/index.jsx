import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectOrders } from '../../../redux/reducers/orders'
import { selectUsers } from '../../../redux/reducers/users'
import Table from './Table'
import { StyledOrders } from '../sytled'
import Input from '../../../Components/common/Input'
import PortalCard from '../../../Components/Portal'
import Bill from '../../../Components/Bill'
import UserCard from '../../../Components/UserCard'

const Orders = () => {
  const orders = useSelector(selectOrders)
  const users = useSelector(selectUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [bill, setBill] = useState({ show: false, orders: [] })
  const [userState, setUserState] = useState({ show: false, user: {} })

  const handlePillShow = (orders) => {
    setBill({
      show: true,
      orders
    })
  }

  const handleUserShow = (user) => {
    setUserState({
      show: true,
      user
    })
  }

  const handleSearchChanged = (e) => {
    setSearchTerm(e.target.value)
  }

  const ordersList = useMemo(() => (Array.isArray(orders) ? orders : []), [orders]);
  const usersList = useMemo(() => (Array.isArray(users) ? users : []), [users]);

  const visibleOrders = useMemo(() => {
    if (!searchTerm?.trim()) return ordersList;
    const term = searchTerm.toLowerCase().trim();
    return ordersList.filter(order => { 
      const user = usersList.find(u => u?.id === order?.userId);
      return (
        user?.name?.toLowerCase().includes(term) || 
        user?.phone?.includes(term) ||
        order?.customerName?.toLowerCase().includes(term) ||
        order?.customerPhone?.includes(term) ||
        order?.orderCode?.toLowerCase().includes(term) ||
        String(order?.id)?.includes(term)
      );
    });
  }, [searchTerm, ordersList, usersList]);

  // Group by verified SSOT status
  const activeOrders = useMemo(() => {
    return visibleOrders.filter(order => {
      const st = order?.orderStatus;
      if (st) {
        return st === 'pending_whatsapp' || st === 'confirmed';
      }
      return !order?.status;
    });
  }, [visibleOrders]);

  const completedOrders = useMemo(() => {
    return visibleOrders.filter(order => {
      const st = order?.orderStatus;
      if (st) {
        return st === 'delivered';
      }
      return Boolean(order?.status);
    });
  }, [visibleOrders]);

  const cancelledOrders = useMemo(() => {
    return visibleOrders.filter(order => {
      const st = order?.orderStatus;
      return st === 'cancelled' || st === 'expired';
    });
  }, [visibleOrders]);

  return (
    <StyledOrders>
      <div style={{ marginBottom: 20 }}>
        <Input
          label="بحث في طلبات العملاء (اسم العميل أو رقم الهاتف أو رقم الطلب)"
          type='text'
          id='search'
          placeholder='اكتب اسم العميل أو الهاتف أو رقم الطلب...'
          onChange={handleSearchChanged}
          value={searchTerm}
        />
      </div>

      <div style={{ marginBottom: 35 }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span>⏳</span>
          <span>الطلبات الجارية والمطلوبة ({activeOrders.length})</span>
        </h2>
        <Table orders={activeOrders} {...{ handlePillShow, handleUserShow, bill, setBill, userState, setUserState }} />
      </div>

      <div style={{ marginBottom: 35 }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span>✅</span>
          <span>الطلبات المكتملة والمُسلَّمة ({completedOrders.length})</span>
        </h2>
        <Table orders={completedOrders} {...{ handlePillShow, handleUserShow, bill, setBill, userState, setUserState }} />
      </div>

      {cancelledOrders.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span>✕</span>
            <span>الطلبات الملغاة والمنتهية الصلاحية ({cancelledOrders.length})</span>
          </h2>
          <Table orders={cancelledOrders} {...{ handlePillShow, handleUserShow, bill, setBill, userState, setUserState }} />
        </div>
      )}
    </StyledOrders>
  )
}

export default Orders
