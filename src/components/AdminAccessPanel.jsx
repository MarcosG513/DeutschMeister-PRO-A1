import { useState, useEffect, useCallback } from 'react';
import { httpsCallable } from 'firebase/functions';
import {
  ShieldAlert,
  ShieldCheck,
  UserPlus,
  RefreshCw,
  CheckCircle2,
  Ban,
  Trash2,
  Loader2,
  Users,
  Clock,
  MailCheck,
  AlertCircle
} from 'lucide-react';
import { functions } from '../config/firebase';

const formatShortDate = (iso) => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return '';
  }
};

const AdminAccessPanel = ({ user, isAdmin }) => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [revokedUsers, setRevokedUsers] = useState([]);
  const [preauthorizedEmails, setPreauthorizedEmails] = useState([]);

  const [isLoadingList, setIsLoadingList] = useState(false);
  const [actionBusyKey, setActionBusyKey] = useState(null);
  const [preauthEmail, setPreauthEmail] = useState('');
  const [preauthRole, setPreauthRole] = useState('user');
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);

  const callManageAccess = useCallback(async (payload) => {
    if (!functions) {
      throw new Error('Firebase Functions no está disponible.');
    }
    const fn = httpsCallable(functions, 'manageUserAccess');
    const res = await fn(payload);
    return res?.data || {};
  }, []);

  const loadAccessLists = useCallback(async () => {
    if (!isAdmin || !functions) return;
    setIsLoadingList(true);
    setError(null);
    try {
      const data = await callManageAccess({ action: 'list' });
      setPendingUsers(Array.isArray(data.pendingUsers) ? data.pendingUsers : []);
      setApprovedUsers(Array.isArray(data.approvedUsers) ? data.approvedUsers : []);
      setRevokedUsers(Array.isArray(data.revokedUsers) ? data.revokedUsers : []);
      setPreauthorizedEmails(Array.isArray(data.preauthorizedEmails) ? data.preauthorizedEmails : []);
    } catch (err) {
      console.warn('[AdminAccessPanel] Error listando accesos:', err);
      setError(err?.message || 'No se pudo cargar la lista de usuarios.');
    } finally {
      setIsLoadingList(false);
    }
  }, [isAdmin, callManageAccess]);

  useEffect(() => {
    if (!isAdmin || !functions) return undefined;
    let cancelled = false;
    (async () => {
      try {
        const data = await callManageAccess({ action: 'list' });
        if (cancelled) return;
        setPendingUsers(Array.isArray(data.pendingUsers) ? data.pendingUsers : []);
        setApprovedUsers(Array.isArray(data.approvedUsers) ? data.approvedUsers : []);
        setRevokedUsers(Array.isArray(data.revokedUsers) ? data.revokedUsers : []);
        setPreauthorizedEmails(Array.isArray(data.preauthorizedEmails) ? data.preauthorizedEmails : []);
      } catch (err) {
        if (!cancelled) {
          console.warn('[AdminAccessPanel] Error cargando accesos:', err);
          setError(err?.message || 'No se pudo cargar la lista de usuarios.');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isAdmin, callManageAccess]);

  if (!isAdmin) return null;

  const handleApprove = async (targetUser, role = 'user') => {
    setActionBusyKey(`approve_${targetUser.uid}`);
    setError(null);
    setFeedback(null);
    try {
      await callManageAccess({
        action: 'approve',
        targetUid: targetUser.uid,
        role
      });
      setFeedback(`Acceso aprobado para ${targetUser.email || targetUser.uid}.`);
      await loadAccessLists();
    } catch (err) {
      setError(err?.message || 'Error al aprobar usuario.');
    } finally {
      setActionBusyKey(null);
    }
  };

  const handleRevoke = async (targetUser) => {
    setActionBusyKey(`revoke_${targetUser.uid}`);
    setError(null);
    setFeedback(null);
    try {
      await callManageAccess({
        action: 'revoke',
        targetUid: targetUser.uid
      });
      setFeedback(`Acceso revocado para ${targetUser.email || targetUser.uid}.`);
      await loadAccessLists();
    } catch (err) {
      setError(err?.message || 'Error al revocar acceso.');
    } finally {
      setActionBusyKey(null);
    }
  };

  const handlePreauthorizeSubmit = async (e) => {
    e.preventDefault();
    const clean = preauthEmail.trim().toLowerCase();
    if (!clean) return;
    setActionBusyKey('preauth_submit');
    setError(null);
    setFeedback(null);
    try {
      const res = await callManageAccess({
        action: 'preauthorize',
        email: clean,
        role: preauthRole
      });
      setPreauthEmail('');
      setPreauthRole('user');
      setFeedback(
        res?.activatedUid
          ? `Correo ${clean} autorizado y activado inmediatamente.`
          : `Correo ${clean} pre-autorizado para acceso directo.`
      );
      await loadAccessLists();
    } catch (err) {
      setError(err?.message || 'No se pudo pre-autorizar el correo.');
    } finally {
      setActionBusyKey(null);
    }
  };

  const handleRemovePreauth = async (targetEmail) => {
    setActionBusyKey(`remove_preauth_${targetEmail}`);
    setError(null);
    setFeedback(null);
    try {
      await callManageAccess({
        action: 'remove_preauth',
        email: targetEmail
      });
      setFeedback(`Pre-autorización eliminada para ${targetEmail}.`);
      await loadAccessLists();
    } catch (err) {
      setError(err?.message || 'Error eliminando pre-autorización.');
    } finally {
      setActionBusyKey(null);
    }
  };

  return (
    <section className="bg-white rounded-3xl p-5 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border-2 border-indigo-200/80 space-y-6">
      {/* Cabecera Admin */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 shrink-0">
            <ShieldAlert size={22} />
          </div>
          <div>
            <div className="flex items-center flex-wrap gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                🛡️ Control de Accesos y Usuarios (Admin)
              </h3>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  pendingUsers.length > 0
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                {pendingUsers.length} pendiente{pendingUsers.length === 1 ? '' : 's'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Aprueba solicitudes pendientes, pre-autoriza correos familiares o revoca accesos en tiempo real.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={loadAccessLists}
          disabled={isLoadingList}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0 self-start sm:self-auto"
        >
          <RefreshCw size={14} className={isLoadingList ? 'animate-spin' : ''} />
          <span>Actualizar</span>
        </button>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-medium">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-medium">
          <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Formulario rápido: Pre-autorizar correo */}
      <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <UserPlus size={16} className="text-indigo-600" />
          <h4 className="text-sm font-bold text-slate-800">Pre-autorizar correo</h4>
        </div>
        <form onSubmit={handlePreauthorizeSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            value={preauthEmail}
            onChange={(e) => setPreauthEmail(e.target.value)}
            placeholder="familiar@gmail.com"
            className="flex-1 bg-white px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
          />
          <select
            value={preauthRole}
            onChange={(e) => setPreauthRole(e.target.value)}
            className="bg-white px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:border-indigo-500 focus:outline-none cursor-pointer"
          >
            <option value="user">Usuario</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            disabled={actionBusyKey === 'preauth_submit' || !preauthEmail.trim()}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            {actionBusyKey === 'preauth_submit' ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <MailCheck size={15} />
            )}
            <span>Autorizar correo</span>
          </button>
        </form>

        {preauthorizedEmails.length > 0 && (
          <div className="pt-2 border-t border-slate-200/70">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Correos Pre-autorizados ({preauthorizedEmails.length})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {preauthorizedEmails.map((item) => (
                <div
                  key={item.email}
                  className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 shadow-2xs"
                >
                  <span className="font-medium truncate max-w-[190px]">{item.email}</span>
                  {item.role === 'admin' && (
                    <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-1.5 rounded">
                      Admin
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemovePreauth(item.email)}
                    disabled={actionBusyKey === `remove_preauth_${item.email}`}
                    className="text-slate-400 hover:text-rose-600 p-0.5 transition cursor-pointer disabled:opacity-40"
                    title="Eliminar pre-autorización"
                    aria-label={`Eliminar pre-autorización ${item.email}`}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Solicitudes Pendientes */}
      <div className="space-y-2.5">
        <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Clock size={16} className="text-amber-500" />
          <span>Solicitudes Pendientes ({pendingUsers.length})</span>
        </h4>

        {isLoadingList && pendingUsers.length === 0 ? (
          <div className="p-4 text-center text-xs text-slate-400">Cargando solicitudes...</div>
        ) : pendingUsers.length === 0 ? (
          <div className="p-4 rounded-2xl border border-dashed border-slate-200 text-center text-xs text-slate-500">
            No hay solicitudes pendientes por revisar.
          </div>
        ) : (
          <div className="space-y-2">
            {pendingUsers.map((u) => (
              <div
                key={u.uid}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {u.photoURL ? (
                    <img
                      src={u.photoURL}
                      alt={u.displayName || u.email}
                      className="w-10 h-10 rounded-full object-cover border border-amber-200 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {(u.displayName || u.email || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {u.displayName || 'Usuario Google'}
                    </p>
                    <p className="text-xs text-slate-600 truncate">{u.email}</p>
                    {u.requestedAt && (
                      <p className="text-[11px] text-amber-700 mt-0.5">
                        Solicitado: {formatShortDate(u.requestedAt)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleApprove(u, 'user')}
                    disabled={Boolean(actionBusyKey)}
                    className="flex-1 sm:flex-none px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer disabled:opacity-50"
                  >
                    {actionBusyKey === `approve_${u.uid}` ? 'Aprobando...' : '✅ Aprobar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRevoke(u)}
                    disabled={Boolean(actionBusyKey)}
                    className="flex-1 sm:flex-none px-3 py-2 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl transition cursor-pointer disabled:opacity-50"
                  >
                    {actionBusyKey === `revoke_${u.uid}` ? 'Rechazando...' : '🚫 Rechazar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Usuarios Autorizados */}
      <div className="space-y-2.5">
        <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Users size={16} className="text-emerald-600" />
          <span>Usuarios Autorizados ({approvedUsers.length})</span>
        </h4>

        <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
          {approvedUsers.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400">
              Sin usuarios registrados aún.
            </div>
          ) : (
            approvedUsers.map((u) => {
              const isSelf = u.uid === user?.uid;
              const isProtected = isSelf || u.isSuperAdmin;
              return (
                <div
                  key={u.uid}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 bg-white hover:bg-slate-50/80 transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {u.photoURL ? (
                      <img
                        src={u.photoURL}
                        alt={u.displayName || u.email}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {(u.displayName || u.email || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {u.displayName || u.email || u.uid}
                        </p>
                        {u.role === 'admin' && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">
                            <ShieldCheck size={10} />
                            {u.isSuperAdmin ? 'Super-Admin' : 'Admin'}
                          </span>
                        )}
                        {isSelf && (
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">
                            Tú
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate">{u.email}</p>
                    </div>
                  </div>

                  {!isProtected && (
                    <button
                      type="button"
                      onClick={() => handleRevoke(u)}
                      disabled={Boolean(actionBusyKey)}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50 self-start sm:self-auto shrink-0"
                    >
                      <Ban size={13} />
                      <span>
                        {actionBusyKey === `revoke_${u.uid}` ? 'Revocando...' : 'Revocar acceso'}
                      </span>
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Usuarios Revocados (opcional para reactivar si hubo error) */}
      {revokedUsers.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Accesos Revocados ({revokedUsers.length})
          </h4>
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
            {revokedUsers.map((u) => (
              <div
                key={u.uid}
                className="flex items-center justify-between gap-3 p-3"
              >
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-700 truncate">
                    {u.displayName || u.email}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">{u.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleApprove(u, 'user')}
                  disabled={Boolean(actionBusyKey)}
                  className="px-2.5 py-1.5 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition cursor-pointer disabled:opacity-50 shrink-0"
                >
                  ✅ Reactivar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminAccessPanel;
