import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import useAxiosPrivate from '../../../Hook/useAxiosPrivet';

const InventoryContainer = styled.div`
  direction: rtl;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 16px;
`;

const KpiCard = styled.div`
  background: ${({ theme }) => theme.palette.card};
  border: 1px solid ${({ theme }) => theme.palette.border};
  border-radius: 16px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);

  .kpiHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.palette.font_secondary};
    font-size: 0.85rem;
    font-weight: 600;
  }

  .kpiValue {
    font-size: 1.65rem;
    font-weight: 800;
    color: ${({ $color, theme }) => $color || theme.palette.font};
  }

  .kpiHint {
    font-size: 0.76rem;
    color: ${({ theme }) => theme.palette.font_secondary};
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

const SearchFilterBar = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;

  input, select {
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.palette.border};
    background: ${({ theme }) => theme.palette.card};
    color: ${({ theme }) => theme.palette.font};
    font-size: 0.88rem;
    outline: none;

    &:focus {
      border-color: #6366f1;
    }
  }

  input {
    min-width: 260px;
  }
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  border: none;
  font-size: 0.84rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &.primary {
    background: #4f46e5;
    color: #ffffff;
    &:hover { background: #4338ca; }
  }

  &.secondary {
    background: #e0e7ff;
    color: #3730a3;
    &:hover { background: #c7d2fe; }
  }

  &.warning {
    background: #fef3c7;
    color: #92400e;
    &:hover { background: #fde68a; }
  }
`;

const TableWrapper = styled.div`
  background: ${({ theme }) => theme.palette.card};
  border: 1px solid ${({ theme }) => theme.palette.border};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: right;
    font-size: 0.88rem;

    th {
      background: ${({ theme }) => theme.palette.ColorApp?.gray3 || '#f8fafc'};
      color: ${({ theme }) => theme.palette.font_secondary};
      padding: 14px 16px;
      font-weight: 700;
      border-bottom: 1px solid ${({ theme }) => theme.palette.border};
      white-space: nowrap;
    }

    td {
      padding: 14px 16px;
      border-bottom: 1px solid ${({ theme }) => theme.palette.border};
      vertical-align: middle;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background: rgba(99, 102, 241, 0.03);
    }
  }
`;

const StockBadge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 700;

  &.in_stock {
    background: #dcfce7;
    color: #15803d;
  }
  &.low_stock {
    background: #fef3c7;
    color: #b45309;
  }
  &.out_of_stock {
    background: #fee2e2;
    color: #b91c1c;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
`;

const ModalCard = styled.div`
  background: ${({ theme }) => theme.palette.card};
  border: 1px solid ${({ theme }) => theme.palette.border};
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  direction: rtl;
  display: flex;
  flex-direction: column;
  gap: 18px;

  h3 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 800;
    color: ${({ theme }) => theme.palette.font};
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .formGroup {
    display: flex;
    flex-direction: column;
    gap: 6px;

    label {
      font-size: 0.85rem;
      font-weight: 700;
      color: ${({ theme }) => theme.palette.font};
    }

    input, textarea, select {
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid ${({ theme }) => theme.palette.border};
      background: ${({ theme }) => theme.palette.page};
      color: ${({ theme }) => theme.palette.font};
      font-size: 0.9rem;
      outline: none;

      &:focus {
        border-color: #6366f1;
      }
    }
  }

  .previewBox {
    background: #f8fafc;
    border: 1px dashed #cbd5e1;
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 0.84rem;
    color: #334155;
    display: flex;
    flex-direction: column;
    gap: 4px;

    .row {
      display: flex;
      justify-content: space-between;
    }
  }

  .modalActions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 8px;
  }
`;

const Inventory = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const pendingWrites = useRef(new Map());

  const submitStockWrite = async (path, payload) => {
    const request = JSON.stringify([path, payload]);
    let key = pendingWrites.current.get(request);
    if (!key) {
      key = uuid();
      pendingWrites.current.set(request, key);
    }
    const response = await axiosPrivate.post(path, { ...payload, idempotencyKey: key });
    pendingWrites.current.delete(request);
    return response;
  };

  // Receive Stock Modal State
  const [receiveModal, setReceiveModal] = useState({ open: false, product: null });
  const [receiveQty, setReceiveQty] = useState('');
  const [receiveCost, setReceiveCost] = useState('');
  const [receiveNotes, setReceiveNotes] = useState('');
  const [submittingReceive, setSubmittingReceive] = useState(false);

  // Adjust Stock Modal State
  const [adjustModal, setAdjustModal] = useState({ open: false, product: null });
  const [adjustPhys, setAdjustPhys] = useState('');
  const [adjustReason, setAdjustReason] = useState('');
  const [submittingAdjust, setSubmittingAdjust] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [overviewRes, productsRes] = await Promise.all([
        axiosPrivate.get('/inventory/overview'),
        axiosPrivate.get('/inventory/products'),
      ]);
      setOverview(overviewRes.data);
      setProducts(productsRes.data || []);
    } catch (err) {
      toast.error('تعذر جلب بيانات المستودع والمخزون');
    } finally {
      setLoading(false);
    }
  }, [axiosPrivate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Categories list derived from products
  const categories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.category?.name) set.add(p.category.name);
    });
    return Array.from(set);
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = (p.name || '').toLowerCase().includes(search.toLowerCase());
      const matchCat = categoryFilter === 'all' || p.category?.name === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [products, search, categoryFilter]);

  // Live WAC Preview Calculator
  const liveWacPreview = useMemo(() => {
    if (!receiveModal.product || !receiveQty || Number(receiveQty) <= 0) return null;
    const curPhys = Number(receiveModal.product.physicalStock) || 0;
    const curCost = receiveModal.product.unitCost != null ? Number(receiveModal.product.unitCost) : null;
    const inQty = Number(receiveQty);
    const inCost = receiveCost !== '' ? Number(receiveCost) : null;

    if (inCost === null || isNaN(inCost) || inCost < 0) {
      return 'غير محدد';
    }

    if (curPhys <= 0) {
      return inCost.toFixed(2);
    }
    if (curCost === null) return 'غير محدد';

    const totalValuation = (curPhys * curCost) + (inQty * inCost);
    const totalUnits = curPhys + inQty;
    return (totalValuation / totalUnits).toFixed(2);
  }, [receiveModal.product, receiveQty, receiveCost]);

  // Submit Receive Stock
  const handleReceiveStockSubmit = async (e) => {
    e.preventDefault();
    if (!receiveQty || Number(receiveQty) <= 0 || !Number.isInteger(Number(receiveQty))) {
      return toast.error('يرجى إدخال كمية صحيحة موجبة');
    }

    try {
      setSubmittingReceive(true);
      const res = await submitStockWrite('/inventory/receive', {
        productId: receiveModal.product.id,
        quantity: Number(receiveQty),
        unitCost: receiveCost !== '' ? Number(receiveCost) : null,
        notes: receiveNotes.trim() || undefined,
      });

      if (res.data?.replayed) {
        toast.success(`تم استرجاع عملية التوريد المعتمدة مسبقاً (${receiveQty} قطعة)`);
      } else {
        toast.success(`تم استلام توريد ${receiveQty} قطعة بنجاح!`);
      }
      setReceiveModal({ open: false, product: null });
      setReceiveQty('');
      setReceiveCost('');
      setReceiveNotes('');
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'لم يصل تأكيد التوريد. أعد المحاولة بنفس البيانات.');
    } finally {
      setSubmittingReceive(false);
    }
  };

  // Submit Adjust Stock
  const handleAdjustSubmit = async (e) => {
    e.preventDefault();
    if (adjustPhys === '' || Number(adjustPhys) < 0 || !Number.isInteger(Number(adjustPhys))) {
      return toast.error('يرجى إدخال كمية فعلية صحيحة غير سالبة');
    }
    if (!adjustReason.trim()) {
      return toast.error('سبب التسوية الجردية مطلوب');
    }

    try {
      setSubmittingAdjust(true);
      await submitStockWrite('/inventory/adjust', {
        productId: adjustModal.product.id,
        newPhysical: Number(adjustPhys),
        expectedStock: Number(adjustModal.product.availableStock),
        reason: adjustReason.trim(),
      });

      toast.success('تمت التسوية الجردية بنجاح!');
      setAdjustModal({ open: false, product: null });
      setAdjustPhys('');
      setAdjustReason('');
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'تعذر حفظ التسوية الجردية');
    } finally {
      setSubmittingAdjust(false);
    }
  };

  return (
    <InventoryContainer>
      {/* KPI Overview Cards */}
      <KpiGrid>
        <KpiCard $color="#2563eb">
          <div className="kpiHeader">
            <span>المخزون الفعلي بالمستودع</span>
            <span>🏢</span>
          </div>
          <div className="kpiValue">{overview ? overview.totalPhysicalUnits : '...'} قطعة</div>
          <div className="kpiHint">القطع الموجودة فعلياً على الرفوف</div>
        </KpiCard>

        <KpiCard $color="#d97706">
          <div className="kpiHeader">
            <span>المحجوز لطلبات نشطة</span>
            <span>⏳</span>
          </div>
          <div className="kpiValue">{overview ? overview.totalReservedUnits : '...'} قطعة</div>
          <div className="kpiHint">طلبات واتساب والمتجر قيد المراجعة</div>
        </KpiCard>

        <KpiCard $color="#059669">
          <div className="kpiHeader">
            <span>المتاح للبيع فوراً</span>
            <span>🛍️</span>
          </div>
          <div className="kpiValue">{overview ? overview.totalAvailableUnits : '...'} قطعة</div>
          <div className="kpiHint">المعروض في المتجر وكتالوج واتساب</div>
        </KpiCard>

        <KpiCard $color="#7c3aed">
          <div className="kpiHeader">
            <span>قيمة المخزون الإجمالية</span>
            <span>💰</span>
          </div>
          <div className="kpiValue">{overview ? `${overview.totalInventoryValuation} ₪` : '...'}</div>
          <div className="kpiHint">محسوبة بالمتوسط المرجح للتكلفة</div>
        </KpiCard>

        <KpiCard $color="#dc2626">
          <div className="kpiHeader">
            <span>تنبيه انخفاض المخزون</span>
            <span>⚠️</span>
          </div>
          <div className="kpiValue">{overview ? overview.lowStockAlertCount : '...'} منتج</div>
          <div className="kpiHint">الكمية المتاحة 5 قطع أو أقل</div>
        </KpiCard>
      </KpiGrid>

      {/* Table Header & Controls */}
      <SectionHeader>
        <SearchFilterBar>
          <input
            type="text"
            placeholder="🔍 بحث باسم المنتج..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">جميع الأقسام</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </SearchFilterBar>

        <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>
          إجمالي المنتجات: {filteredProducts.length}
        </div>
      </SectionHeader>

      {/* Products Table */}
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th>المنتج</th>
              <th>القسم</th>
              <th>سعر البيع</th>
              <th>تكلفة الشراء (WAC)</th>
              <th>المخزون الفعلي</th>
              <th>المحجوز</th>
              <th>المتاح للبيع</th>
              <th>الحالة</th>
              <th>إجراءات التوريد</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  جاري تحميل بيانات المستودع والمخزون...
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  لا توجد منتجات مطابقة لخيارات البحث
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => {
                const avail = Number(p.availableStock);
                const phys = Number(p.physicalStock) || 0;
                const res = Number(p.reservedStock) || 0;
                const cost = p.unitCost != null ? Number(p.unitCost) : null;

                let badgeClass = 'in_stock';
                let badgeText = 'متوفر';
                if (avail <= 0) {
                  badgeClass = 'out_of_stock';
                  badgeText = 'نافد';
                } else if (avail <= 5) {
                  badgeClass = 'low_stock';
                  badgeText = 'منخفض';
                }

                return (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {p.images && p.images[0] && (
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            style={{ width: 38, height: 38, borderRadius: 8, objectFit: 'cover' }}
                          />
                        )}
                        <div>
                          <strong>{p.name}</strong>
                          <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>#LB-P{p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>{p.category?.name || 'عام'}</td>
                    <td><strong style={{ color: '#059669' }}>{p.price} ₪</strong></td>
                    <td>
                      {cost !== null ? (
                        <span style={{ fontWeight: 700, color: '#4338ca' }}>{cost} ₪</span>
                      ) : (
                        <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>غير محدد</span>
                      )}
                    </td>
                    <td><strong>{phys}</strong> قطعة</td>
                    <td style={{ color: res > 0 ? '#d97706' : '#94a3b8', fontWeight: res > 0 ? 800 : 400 }}>
                      {res} قطعة
                    </td>
                    <td>
                      <strong style={{ fontSize: '0.95rem' }}>{avail}</strong> قطعة
                    </td>
                    <td>
                      <StockBadge className={badgeClass}>{badgeText}</StockBadge>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <ActionButton
                          type="button"
                          className="primary"
                          title="استلام شحنة بضاعة جديدة وتحديث المتوسط المرجح"
                          onClick={() => {
                            setReceiveModal({ open: true, product: p });
                            setReceiveQty('');
                            setReceiveCost('');
                            setReceiveNotes('');
                          }}
                        >
                          📥 استلام توريد
                        </ActionButton>

                        <ActionButton
                          type="button"
                          className="secondary"
                          title="تسوية جردية للكمية الفعلية على الرفوف"
                          onClick={() => {
                            setAdjustModal({ open: true, product: p });
                            setAdjustPhys(String(phys));
                            setAdjustReason('');
                          }}
                        >
                          ⚖️ تسوية
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </TableWrapper>

      {/* Modal: Receive Stock (استلام توريد) */}
      {receiveModal.open && (
        <ModalOverlay onClick={() => !submittingReceive && setReceiveModal({ open: false, product: null })}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>📥 استلام بضاعة وتوريد للمستودع</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
              المنتج: <strong>{receiveModal.product?.name}</strong>
            </p>

            <form onSubmit={handleReceiveStockSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="formGroup">
                <label>الكمية المستلمة (قطع) *</label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  required
                  placeholder="مثال: 20"
                  value={receiveQty}
                  onChange={(e) => setReceiveQty(e.target.value)}
                />
              </div>

              <div className="formGroup">
                <label>سعر شراء الوحدة في هذا التوريد (₪)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="مثال: 65.50 (اتركه فارغاً إن لم يتغير)"
                  value={receiveCost}
                  onChange={(e) => setReceiveCost(e.target.value)}
                />
              </div>

              <div className="previewBox">
                <div className="row">
                  <span>المخزون الفعلي الحالي:</span>
                  <strong>{receiveModal.product?.physicalStock || 0} قطعة</strong>
                </div>
                <div className="row">
                  <span>تكلفة الشراء السابقة:</span>
                  <strong>{receiveModal.product?.unitCost != null ? `${receiveModal.product.unitCost} ₪` : 'غير محدد'}</strong>
                </div>
                <div className="row" style={{ marginTop: 4, paddingTop: 4, borderTop: '1px dashed #cbd5e1', color: '#4f46e5' }}>
                  <span>المتوسط المرجح الجديد (WAC):</span>
                  <strong>{liveWacPreview != null ? `${liveWacPreview} ₪` : '---'}</strong>
                </div>
                <div className="row" style={{ color: '#059669' }}>
                  <span>المخزون الفعلي بعد الاستلام:</span>
                  <strong>{(Number(receiveModal.product?.physicalStock) || 0) + (Number(receiveQty) || 0)} قطعة</strong>
                </div>
              </div>

              <div className="formGroup">
                <label>ملاحظات التوريد / رقم الفاتورة (اختياري)</label>
                <textarea
                  rows="2"
                  placeholder="مثال: فاتورة مورد رقم #8892 شركة القدس للعطور"
                  value={receiveNotes}
                  onChange={(e) => setReceiveNotes(e.target.value)}
                />
              </div>

              <div className="modalActions">
                <ActionButton
                  type="button"
                  className="secondary"
                  disabled={submittingReceive}
                  onClick={() => setReceiveModal({ open: false, product: null })}
                >
                  إلغاء
                </ActionButton>
                <ActionButton
                  type="submit"
                  className="primary"
                  disabled={submittingReceive}
                >
                  {submittingReceive ? 'جاري الحفظ...' : 'تأكيد الاستلام والتوريد'}
                </ActionButton>
              </div>
            </form>
          </ModalCard>
        </ModalOverlay>
      )}

      {/* Modal: Adjust Stock (تسوية جردية) */}
      {adjustModal.open && (
        <ModalOverlay onClick={() => !submittingAdjust && setAdjustModal({ open: false, product: null })}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>⚖️ تسوية جردية لمخزون المنتج</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
              المنتج: <strong>{adjustModal.product?.name}</strong>
            </p>

            <form onSubmit={handleAdjustSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="formGroup">
                <label>الكمية الفعلية الجديدة في المستودع *</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  required
                  placeholder="مثال: 15"
                  value={adjustPhys}
                  onChange={(e) => setAdjustPhys(e.target.value)}
                />
              </div>

              <div className="previewBox">
                <div className="row">
                  <span>الكمية الفعلية الحالية:</span>
                  <strong>{adjustModal.product?.physicalStock || 0} قطعة</strong>
                </div>
                <div className="row">
                  <span>الكمية المحجوزة لطلبات:</span>
                  <strong>{adjustModal.product?.reservedStock || 0} قطعة</strong>
                </div>
                <div className="row" style={{ color: '#4f46e5', marginTop: 4, paddingTop: 4, borderTop: '1px dashed #cbd5e1' }}>
                  <span>المتاح للبيع الجديد:</span>
                  <strong>{Math.max(0, (Number(adjustPhys) || 0) - (Number(adjustModal.product?.reservedStock) || 0))} قطعة</strong>
                </div>
              </div>

              <div className="formGroup">
                <label>سبب التسوية الجردية *</label>
                <select
                  required
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                >
                  <option value="">-- اختر سبب التسوية --</option>
                  <option value="جرد دوري ومطابقة الرف">جرد دوري ومطابقة الرف</option>
                  <option value="إتلاف بضاعة منتهية الصلاحية أو مكسورة">إتلاف بضاعة منتهية الصلاحية أو مكسورة</option>
                  <option value="فقدان أو عجز في المستودع">فقدان أو عجز في المستودع</option>
                  <option value="عينة تسويقية / تصوير منتجات">عينة تسويقية / تصوير منتجات</option>
                  <option value="أخرى (توضيح في الملاحظات)">أخرى</option>
                </select>
              </div>

              <div className="modalActions">
                <ActionButton
                  type="button"
                  className="secondary"
                  disabled={submittingAdjust}
                  onClick={() => setAdjustModal({ open: false, product: null })}
                >
                  إلغاء
                </ActionButton>
                <ActionButton
                  type="submit"
                  className="warning"
                  disabled={submittingAdjust}
                >
                  {submittingAdjust ? 'جاري الحفظ...' : 'حفظ التسوية الجردية'}
                </ActionButton>
              </div>
            </form>
          </ModalCard>
        </ModalOverlay>
      )}
    </InventoryContainer>
  );
};

export default Inventory;
