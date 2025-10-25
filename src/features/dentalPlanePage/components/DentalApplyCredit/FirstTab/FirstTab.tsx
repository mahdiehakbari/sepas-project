'use client';
import { Button } from '@/sharedComponent/ui';
import ResponsiveModal from '@/sharedComponent/ui/ResponsiveModal/Modal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreditNoteModal } from '../components';
import Cookies from 'js-cookie';
import { PhoneNumberModal } from '@/features/layout';
import { OtpModal } from '@/features/layout/components/Auth/OTPComponent/OtpModal';
import { toast } from 'react-toastify';
import { ProfileForm } from '@/features/profile';
import { IProfileFormValues } from '@/sharedComponent/ui/Input/types';
import axios from 'axios';
import { API_BUDGET_CALC, API_BUDGET_QUERY } from '@/config/api_address.config';
import { InquiringBudget } from '../components/InquiringBudget/InquiringBudget';
import { IFeeConfiguration } from './types';

export const FirstTab = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const options = ['۶ ماهه', '۹ ماهه', '۱۲ ماهه', '۱۸ ماهه'];
  const [active, setActive] = useState(options[0]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [creditLoading, setCreditLoading] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenOtpModal, setIsOpenOtpModal] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [userProfile, setUserProfile] = useState<IProfileFormValues | null>(
    null,
  );
  const [budgetData, setBudgetData] = useState<number | null>(null);
  const [budgetCalcData, setBudgetCalcData] = useState<IFeeConfiguration>([]);

  const token = Cookies.get('token');
  const userInfo = Cookies.get('userProfile');

  const handleBudgetLoading = () => {
    setCreditLoading(true);
    setTimeout(() => {
      setCreditLoading(false);

      setBudgetData(2000000000);
    }, 3000);
    // axios
    //   .get(`${API_BUDGET_QUERY}/0491307314`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     setCreditLoading(false);
    //     console.log('hiiii', res.data);
    //     setBudgetData(res.data);
    //   })
    //   .catch(() => {
    //     setCreditLoading(false);
    //   });
  };

  const handleShowModal = () => {
    setIsOpenModal(true);
    setCreditLoading(false);
    if (!token) {
      toast.success(t('credit:log_in_continue'), {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        icon: false,
        style: {
          backgroundColor: '#ebf3fd',
          color: 'black',
          fontSize: '16px',
          borderRadius: '8px',
          textAlign: 'center',
        },
      });

      setIsOpenLoginModal(true);
    }
    if (userInfo) {
      setUserProfile(JSON.parse(userInfo));
    }
  };
  const handleProfileBack = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    if (budgetData) {
      axios
        .get(API_BUDGET_CALC, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log('hiii', res.data.feeConfigurations);
          setBudgetCalcData(res.data.feeConfigurations);
        })
        .catch(() => {});
    }
  }, [budgetData]);
  return (
    <div className='flex flex-wrap -mx-4 '>
      <div className='w-full md:w-6/12 px-4 mb-4 md:mb-0'>
        <div className=' p-6 rounded-lg  border-2  border-border-color bg-white'>
          <div className='flex items-center justify-between mb-6'>
            <h3 className='text-black text-[14px] font-[500] '>
              {t('dental_plane:loan_amount')}
            </h3>
            <p className='text-primary text-[14px] font-[700] bg-active-tab-color px-4 py-1 rounded-[16px]'>
              {t('dental_plane:guide')}
            </p>
          </div>

          <div className='relative w-full mb-6'>
            <div className='absolute top-1/2 left-0 w-full h-2 bg-gray-300 rounded-full transform -translate-y-1/2' />

            <div
              className='absolute top-1/2 left-0 h-2 bg-blue-500 rounded-full transform -translate-y-1/2'
              style={{ width: `${value}%` }}
            />

            <input
              type='range'
              min={0}
              max={100}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className='relative w-full appearance-none bg-transparent cursor-pointer'
              dir='ltr'
            />
          </div>

          <div className='flex items-center justify-between border-b-1 border-[#e0e0e0] pb-10 mb-10'>
            <p className='text-second-text-color font-[500] text-[13px]'>
              75 میلیون تومان
            </p>
            <p className='text-[#4E4E4E] bg-[#E0E0E0] rounded-[48px] py-2 px-6 font-[700] text-[14px]'>
              15 میلیون تومان
            </p>
            <p className='text-second-text-color font-[500] text-[13px]'>
              ۱۰ میلیون تومان
            </p>
          </div>

          <h3 className='text-black text-[14px] font-[500] mb-6'>
            {t('dental_plane:contract_period')}
          </h3>
          <div className='flex gap-3'>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => setActive(option)}
                className={` w-[85px] py-1 text-center rounded-full border transition  text-[13px] font-[500] cursor-pointer
            ${
              active === option
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-black border-gray-300 hover:border-blue-400'
            }
          `}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className='w-full md:w-6/12 px-4'>
        <div className='p-6 rounded-lg  border-2  border-border-color bg-white'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-black text-[14px] font-[500]'>
              {t('dental_plane:calculation_results')}
            </h3>
            <p className='text-primary text-[14px] font-[700] bg-active-tab-color px-4 py-1 rounded-[16px]'>
              {t('dental_plane:interest_rate')}
            </p>
          </div>
          <div className='md:flex gap-2 mb-2'>
            <div className='w-full md:w-6/12 mb-2 md:mb-0'>
              <div className='p-6 rounded-lg  border-1  border-border-color bg-col-bg'>
                <h3 className='text-second-text-color font-[500] text-[13px] mb-2'>
                  {t('dental_plane:monthly_installment')}
                </h3>
                <h4 className='text-black font-[700] text-[16px]'>
                  8,901,204 تومان
                </h4>
              </div>
            </div>
            <div className='w-full md:w-6/12'>
              <div className='p-6 rounded-lg  border-1  border-border-color bg-col-bg'>
                <h3 className='text-second-text-color font-[500] text-[13px] mb-2'>
                  {t('dental_plane:total_refund')}
                </h3>
                <h4 className='text-black font-[700] text-[16px]'>
                  53,407,221 تومان
                </h4>
              </div>
            </div>
          </div>
          <div className='w-full mb-4'>
            <div className='p-6 rounded-lg  border-1  border-border-color bg-col-bg'>
              <h3 className='text-second-text-color font-[500] text-[13px] mb-2'>
                {t('dental_plane:purchasing_power')}
              </h3>
              <h4 className='text-black font-[700] text-[16px]'>
                45,638,476 تومان
              </h4>
            </div>
          </div>

          <Button className='w-full' onClick={handleShowModal}>
            {t('dental_plane:apply_credit')}
          </Button>
        </div>
      </div>

      <ResponsiveModal
        isOpen={isOpenModal}
        title={
          !token || creditLoading == true
            ? undefined
            : budgetData == null
            ? t('credit:validation_result_budget')
            : t('credit:apply_credit')
        }
        onClose={() => setIsOpenModal(false)}
      >
        {token && userProfile ? (
          <>
            {budgetData ? (
              <>
                {showBill == true ? (
                  <>hiiii</>
                ) : (
                  <InquiringBudget
                    setShowBill={setShowBill}
                    budgetData={budgetData}
                  />
                )}
              </>
            ) : (
              <CreditNoteModal
                handleBudgetLoading={handleBudgetLoading}
                creditLoading={creditLoading}
              />
            )}
          </>
        ) : !token && !userProfile ? (
          <>
            {isOpenLoginModal && (
              <PhoneNumberModal
                setIsOpenLoginModal={setIsOpenLoginModal}
                setIsOpenOtpModal={setIsOpenOtpModal}
                setIsOpenModal={setIsOpenModal}
              />
            )}
            {isOpenOtpModal && (
              <OtpModal
                setIsOpenOtpModal={setIsOpenOtpModal}
                setIsOpenLoginModal={setIsOpenLoginModal}
                setIsOpenModal={setIsOpenModal}
              />
            )}
          </>
        ) : (
          token &&
          !userProfile && (
            <>
              <ProfileForm
                name='credit'
                handleBack={handleProfileBack}
                setIsOpenModal={setIsOpenModal}
              />
            </>
          )
        )}
      </ResponsiveModal>
    </div>
  );
};
