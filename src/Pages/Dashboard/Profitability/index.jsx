import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import useAxiosPrivate from '../../../Hook/useAxiosPrivet';
import dateFormater from '../../../utels/dateFormater';

const ProfitContainer = styled.div`
  direction: rtl;
  display: flex;
  flex-direction: column;
  gap: 22px;
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
  gap: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);

  .presetButtons {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    button {
      padding: 8px 16px;
      border-radius: 10px;
      border: 1px solid ${({ theme }) => theme.palette.border};
      background: ${({ theme }) => theme.palette.page};
      color: ${({ theme }) => theme.palette.font};
      font-size: 0.84rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;

      &.active {
        background: #4f46e5;
        color: #ffffff;
        border-color: #4f46e5;
      }
    }
  }

  .customDates {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;

    input[type="date"] {
      padding: 7px 12px;
      border-radius: 8px;
      border: 1px solid ${({ theme }) => theme.palette.border};
      background: ${({ theme }) => theme.palette.page};
      color: ${({ theme }) => theme.palette.font};
      font-size: 0.84rem;
      outline: none;
    }
  }
`;

const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

const AlertBanner = styled.div`
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 12px;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: #92400e;
  line-height: 1.5;
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
    font-size: 0.86rem;
    min-width: 850px;

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
      background: rgba(99, 102, 241, 0.02);
    }
  }
`;

const Profitability = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);
  const [rangePreset, setRangePreset] = useState('all');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const fetchReport = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};

      const now = new Date();
      if (rangePreset === 'today') {
        const todayStr = now.toISOString().split('T')[0];
        params.startDate = todayStr;
      } else if (rangePreset === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        params.startDate = weekAgo.toISOString().split('T')[0];
      } else if (rangePreset === 'month') {
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        params.startDate = firstDay.toISOString().split('T')[0];
      } else if (rangePreset === 'custom') {
        if (customStart) params.startDate = customStart;
        if (customEnd) params.endDate = customEnd;
      }

      const res = await axiosPrivate.get('/inventory/profitability', { params });
      setReport(res.data);
    } catch (err) {
      toast.error('تعذر جلب تقرير الأرباح');
    } finally {
      setLoading(false);
    }
  }, [axiosPrivate, rangePreset, customStart, customEnd]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return (
    <ProfitContainer>
      {/* Date Filter Bar */}
      <FilterCard>
        <div className="presetButtons">
          <button
            type="button"
            className={rangePreset === 'today' ? 'active' : ''}
            onClick={() => setRangePreset('today')}
          >
            اليوم
          </button>
          <button
            type="button"
            className={rangePreset === 'week' ? 'active' : ''}
            onClick={() => setRangePreset('week')}
          >
            آخر 7 أيام
          </button>
          <button
            type="button"
            className={rangePreset === 'month' ? 'active' : ''}
            onClick={() => setRangePreset('month')}
          >
            هذا الشهر
          </button>
          <button
            type="button"
            className={rangePreset === 'all' ? 'active' : ''}
            onClick={() => setRangePreset('all')}
          >
            كل الفترة
          </button>
          <button
            type="button"
            className={rangePreset === 'custom' ? 'active' : ''}
            onClick={() => setRangePreset('custom')}
          >
            مخصص...
          </button>
        </div>

        {rangePreset === 'custom' && (
          <div className="customDates">
            <span>من:</span>
            <input
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
            />
            <span>إلى:</span>
            <input
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
            />
          </div>
        )}
      </FilterCard>

      {/* KPI Cards */}
      <KpiGrid>
        <KpiCard $color="#2563eb">
          <div className="kpiHeader">
            <span>إجمالي المبيعات المحققة</span>
            <span>💰</span>
          </div>
          <div className="kpiValue">{report ? `${report.totalDeliveredRevenue ?? report.totalRevenue} ₪` : '...'}</div>
          <div className="kpiHint">قيمة الطلبات المسلّمة للعملاء</div>
        </KpiCard>

        <KpiCard $color="#d97706">
          <div className="kpiHeader">
            <span>تكلفة البضاعة المباعة (المحددة)</span>
            <span>📦</span>
          </div>
          <div className="kpiValue">{report ? `${report.knownCostCOGS ?? report.totalCOGS} ₪` : '...'}</div>
          <div className="kpiHint">تكلفة شراء الوحدات المسلّمة فعلياً</div>
        </KpiCard>

        <KpiCard $color="#059669">
          <div className="kpiHeader">
            <span>مجمل الربح {report && !report.isCostCoverageComplete ? '(المحدد)' : ''}</span>
            <span>📈</span>
          </div>
          <div className="kpiValue">
            {report ? (
              report.isCostCoverageComplete
                ? `${report.overallGrossProfit} ₪`
                : `${report.knownCostGrossProfit ?? 0} ₪*`
            ) : '...'}
          </div>
          <div className="kpiHint">
            {report && !report.isCostCoverageComplete
              ? '*محسوب فقط للطلبات محددة التكلفة'
              : 'المبيعات ناقص تكلفة البضاعة'}
          </div>
        </KpiCard>

        <KpiCard $color="#7c3aed">
          <div className="kpiHeader">
            <span>هامش الربح {report && !report.isCostCoverageComplete ? '(المحدد)' : ''}</span>
            <span>📊</span>
          </div>
          <div className="kpiValue">
            {report ? (
              report.isCostCoverageComplete
                ? `${report.overallGrossMarginPercent}%`
                : `${report.knownCostGrossMarginPercent ?? 0}%*`
            ) : '...'}
          </div>
          <div className="kpiHint">نسبة الربح من المبيعات محددة التكلفة</div>
        </KpiCard>

        <KpiCard $color={report && !report.isCostCoverageComplete ? '#d97706' : '#0891b2'}>
          <div className="kpiHeader">
            <span>نسبة تغطية التكلفة</span>
            <span>🛡️</span>
          </div>
          <div className="kpiValue">{report ? `${report.costCoveragePercent}%` : '...'}</div>
          <div className="kpiHint">
            {report && !report.isCostCoverageComplete
              ? `${report.unknownCostOrdersCount} طلبات بتكلفة غير مسجلة`
              : 'بيانات التكلفة مكتملة 100%'}
          </div>
        </KpiCard>
      </KpiGrid>

      {/* Notice about unknown cost */}
      {report && !report.isCostCoverageComplete && (
        <AlertBanner>
          <span>⚠️</span>
          <div>
            <strong>تنبيه محاسبي لمنع تضخيم الأرباح:</strong> هناك <strong>{report.unknownCostOrdersCount}</strong> طلب مسلّم بقيمة <strong>{report.unknownCostRevenue} ₪</strong> لم تسجل لها تكلفة شراء وقت البيع. تم احتساب الربح فقط للمبيعات محددة التكلفة (تغطية {report.costCoveragePercent}%)، واستبعاد مبيعات التكلفة غير المحددة من مجمل الربح لتفادي أي أرقام مضللة.
          </div>
        </AlertBanner>
      )}

      {/* Delivered Orders Table */}
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th>رقم الطلب / الحركة</th>
              <th>التاريخ</th>
              <th>العميل</th>
              <th>إجمالي الفاتورة (إيراد)</th>
              <th>تكلفة الشراء (COGS)</th>
              <th>مجمل الربح</th>
              <th>هامش الربح</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  جاري احتساب أرباح المبيعات...
                </td>
              </tr>
            ) : !report?.orders?.length ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  لا توجد طلبات مسلّمة في الفترة المحددة
                </td>
              </tr>
            ) : (
              report.orders.map((o) => {
                const isReturn = o.eventType === 'return' || o.revenue < 0;
                return (
                  <tr key={`${o.id}-${o.eventType || 'delivery'}`} style={isReturn ? { background: '#fff1f2' } : {}}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <strong style={{ color: isReturn ? '#be123c' : '#4f46e5' }}>{o.orderCode}</strong>
                        {isReturn && (
                          <span style={{ background: '#fecdd3', color: '#9f1239', padding: '2px 6px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 700 }}>
                            ↩️ تسوية إرجاع
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ direction: 'ltr', textAlign: 'right', fontSize: '0.78rem' }}>
                      {o.eventDate ? dateFormater(o.eventDate) : (o.deliveredAt ? dateFormater(o.deliveredAt) : '-')}
                    </td>
                    <td>
                      <div>
                        <strong>{o.customerName || 'عميل المتجر'}</strong>
                        {o.customerPhone && (
                          <div style={{ fontSize: '0.74rem', color: '#64748b' }} dir="ltr">{o.customerPhone}</div>
                        )}
                      </div>
                    </td>
                    <td>
                      <strong style={{ color: isReturn ? '#be123c' : '#059669' }}>{o.revenue} ₪</strong>
                    </td>
                    <td>
                      {o.cogs !== null ? (
                        <span style={{ color: '#d97706', fontWeight: 700 }}>{o.cogs} ₪</span>
                      ) : (
                        <span style={{ color: '#dc2626', fontSize: '0.75rem', fontWeight: 700 }}>⚠️ غير محدد</span>
                      )}
                    </td>
                    <td>
                      {o.grossProfit !== null ? (
                        <strong style={{ color: o.grossProfit >= 0 ? '#16a34a' : '#be123c', fontSize: '0.92rem' }}>
                          {o.grossProfit >= 0 ? `+${o.grossProfit}` : o.grossProfit} ₪
                        </strong>
                      ) : (
                        <span style={{ color: '#94a3b8' }}>-</span>
                      )}
                    </td>
                    <td>
                      {o.marginPercent !== null ? (
                        <span style={{ background: '#e0e7ff', color: '#3730a3', padding: '3px 8px', borderRadius: 12, fontWeight: 700, fontSize: '0.75rem' }}>
                          {o.marginPercent}%
                        </span>
                      ) : (
                        <span style={{ color: '#94a3b8' }}>-</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </TableWrapper>
    </ProfitContainer>
  );
};

export default Profitability;
