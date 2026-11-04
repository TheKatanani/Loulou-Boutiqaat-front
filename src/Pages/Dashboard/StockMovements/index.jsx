import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import useAxiosPrivate from '../../../Hook/useAxiosPrivet';
import dateFormater from '../../../utels/dateFormater';

const MovementsContainer = styled.div`
  direction: rtl;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FilterCard = styled.div`
  background: ${({ theme }) => theme.palette.card};
  border: 1px solid ${({ theme }) => theme.palette.border};
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);

  .filterGroup {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;

    label {
      font-size: 0.85rem;
      font-weight: 700;
      color: ${({ theme }) => theme.palette.font_secondary};
    }

    select {
      padding: 8px 14px;
      border-radius: 10px;
      border: 1px solid ${({ theme }) => theme.palette.border};
      background: ${({ theme }) => theme.palette.page};
      color: ${({ theme }) => theme.palette.font};
      font-size: 0.88rem;
      outline: none;
    }
  }
`;

const TableWrapper = styled.div`
  background: ${({ theme }) => theme.palette.card};
  border: 1px solid ${({ theme }) => theme.palette.border};
  border-radius: 16px;
  overflow-x: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: right;
    font-size: 0.85rem;
    min-width: 900px;

    th {
      background: ${({ theme }) => theme.palette.ColorApp?.gray3 || '#f8fafc'};
      color: ${({ theme }) => theme.palette.font_secondary};
      padding: 12px 14px;
      font-weight: 700;
      border-bottom: 1px solid ${({ theme }) => theme.palette.border};
      white-space: nowrap;
    }

    td {
      padding: 12px 14px;
      border-bottom: 1px solid ${({ theme }) => theme.palette.border};
      vertical-align: middle;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background: rgba(99, 102, 241, 0.02);
    }
  }
`;

const MovementBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.76rem;
  font-weight: 700;
  white-space: nowrap;

  &.receipt {
    background: #dcfce7;
    color: #15803d;
  }
  &.reservation {
    background: #fef3c7;
    color: #b45309;
  }
  &.reservation_release {
    background: #e0e7ff;
    color: #4338ca;
  }
  &.delivery {
    background: #f3e8ff;
    color: #7e22ce;
  }
  &.return {
    background: #ffe4e6;
    color: #be123c;
  }
  &.adjustment {
    background: #f1f5f9;
    color: #475569;
  }
  &.opening_balance {
    background: #ccfbf1;
    color: #0f766e;
  }
`;

const StockTrace = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 0.76rem;
  color: #64748b;

  .traceRow {
    display: flex;
    gap: 4px;
  }
  .highlight {
    font-weight: 700;
    color: ${({ theme }) => theme.palette.font};
  }
`;

const PaginationBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.palette.font_secondary};

  .btnGroup {
    display: flex;
    gap: 8px;

    button {
      padding: 6px 14px;
      border-radius: 8px;
      border: 1px solid ${({ theme }) => theme.palette.border};
      background: ${({ theme }) => theme.palette.card};
      color: ${({ theme }) => theme.palette.font};
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;

      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }
  }
`;

const movementMeta = {
  receipt: { label: 'توريد واستلام', icon: '📥', className: 'receipt' },
  reservation: { label: 'حجز لطلب', icon: '⏳', className: 'reservation' },
  reservation_release: { label: 'تحرير حجز ملغي', icon: '🔄', className: 'reservation_release' },
  delivery: { label: 'تسليم ومبيع', icon: '📦', className: 'delivery' },
  return: { label: 'مرتجع مسلّم', icon: '↩️', className: 'return' },
  adjustment: { label: 'تسوية جردية', icon: '⚖️', className: 'adjustment' },
  opening_balance: { label: 'رصيد افتتاحي', icon: '🏁', className: 'opening_balance' },
};

const StockMovements = () => {
  const axiosPrivate = useAxiosPrivate();
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filterType, setFilterType] = useState('');

  const fetchMovements = useCallback(async () => {
    try {
      setLoading(true);
      const params = { page, limit: 30 };
      if (filterType) params.movementType = filterType;

      const res = await axiosPrivate.get('/inventory/movements', { params });
      setMovements(res.data.movements || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
      setTotalCount(res.data.pagination?.total || 0);
    } catch (err) {
      toast.error('تعذر جلب سجل حركات المخزون');
    } finally {
      setLoading(false);
    }
  }, [axiosPrivate, page, filterType]);

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  return (
    <MovementsContainer>
      {/* Filters */}
      <FilterCard>
        <div className="filterGroup">
          <label>تصفية حسب نوع الحركة:</label>
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setPage(1);
            }}
          >
            <option value="">جميع الحركات</option>
            <option value="receipt">📥 استلام وتوريد (Receipt)</option>
            <option value="delivery">📦 تسليم ومبيع (Delivery)</option>
            <option value="reservation">⏳ حجز لطلب (Reservation)</option>
            <option value="reservation_release">🔄 تحرير حجز (Release)</option>
            <option value="return">↩️ مرتجع مسلّم (Return)</option>
            <option value="adjustment">⚖️ تسوية جردية (Adjustment)</option>
            <option value="opening_balance">🏁 رصيد افتتاحي (Opening Balance)</option>
          </select>
        </div>

        <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>
          إجمالي الحركات المسجلة: {totalCount} حركة
        </div>
      </FilterCard>

      {/* Audit Table */}
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>التاريخ والوقت</th>
              <th>نوع الحركة</th>
              <th>المنتج</th>
              <th>الكمية</th>
              <th>تكلفة الشراء</th>
              <th>إجمالي التكلفة</th>
              <th>أثر المخزون (فعلي / متاح)</th>
              <th>رقم الطلب</th>
              <th>الملاحظات / السبب</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="10" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  جاري تحميل سجل حركات المخزون...
                </td>
              </tr>
            ) : movements.length === 0 ? (
              <tr>
                <td colSpan="10" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  لا توجد حركات مخزون مسجلة في هذا القسم
                </td>
              </tr>
            ) : (
              movements.map((m) => {
                const meta = movementMeta[m.movementType] || { label: m.movementType, icon: '•', className: 'adjustment' };
                const qtyVal = Number(m.quantity);
                const isPositive = qtyVal > 0;

                return (
                  <tr key={m.id}>
                    <td style={{ color: '#94a3b8', fontSize: '0.78rem' }}>#{m.id}</td>
                    <td style={{ direction: 'ltr', textAlign: 'right', whiteSpace: 'nowrap', fontSize: '0.78rem' }}>
                      {m.createdAt ? dateFormater(m.createdAt) : '-'}
                    </td>
                    <td>
                      <MovementBadge className={meta.className}>
                        <span>{meta.icon}</span>
                        <span>{meta.label}</span>
                      </MovementBadge>
                    </td>
                    <td>
                      <strong>{m.product?.name || `منتج #${m.productId}`}</strong>
                    </td>
                    <td>
                      <strong style={{ color: isPositive ? '#16a34a' : '#dc2626', fontSize: '0.92rem' }}>
                        {isPositive ? `+${qtyVal}` : qtyVal}
                      </strong>
                    </td>
                    <td>
                      {m.unitCost != null ? `${m.unitCost} ₪` : <span style={{ color: '#94a3b8' }}>-</span>}
                    </td>
                    <td>
                      {m.totalCost != null ? <strong>{m.totalCost} ₪</strong> : <span style={{ color: '#94a3b8' }}>-</span>}
                    </td>
                    <td>
                      <StockTrace>
                        <div className="traceRow">
                          <span>فعلي:</span>
                          <span className="highlight">{m.physicalBefore} ➔ {m.physicalAfter}</span>
                        </div>
                        <div className="traceRow">
                          <span>متاح:</span>
                          <span className="highlight">{m.availableBefore} ➔ {m.availableAfter}</span>
                        </div>
                      </StockTrace>
                    </td>
                    <td>
                      {m.orderCode ? (
                        <span style={{ fontWeight: 800, color: '#4f46e5' }}>{m.orderCode}</span>
                      ) : (
                        <span style={{ color: '#94a3b8' }}>-</span>
                      )}
                    </td>
                    <td style={{ maxWidth: 220, fontSize: '0.8rem', color: '#475569' }}>
                      {m.notes || '-'}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <PaginationBar>
          <span>الصفحة {page} من {totalPages}</span>
          <div className="btnGroup">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              السابق
            </button>
            <button
              type="button"
              disabled={page >= totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
            >
              التالي
            </button>
          </div>
        </PaginationBar>
      </TableWrapper>
    </MovementsContainer>
  );
};

export default StockMovements;
